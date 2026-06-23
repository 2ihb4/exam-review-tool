# 本地运行与 Vercel 部署

## 1. 当前版本是什么

当前网页可以直接本地运行，数据通过 `data-service.js` 保存在当前浏览器中。这个模式适合检查页面和演示流程，不支持真正的跨设备恢复，也不能作为 60 人正式共用的数据源。

正式上线需要完成 Supabase 连接。Supabase 可以理解为云端的“账号系统 + 数据库”，Vercel 负责把网页发布成公开链接。

## 2. 本地运行

打开终端，输入：

```bash
cd /Users/a1/Documents/engine
python3 -m http.server 4173
```

浏览器打开：

```text
http://localhost:4173/
```

成功标准：看到匿名进入页，昵称可以不填，点击“开始复习”后出现进度恢复码和复习驾驶舱。

## 3. 本地测试清单

1. 点击“开始复习”，截图保存恢复码。
2. 进入科目，检查“重点、练习、错题、预测、AI”五个模块。
3. 在练习中故意答错一道题，确认错题模块自动出现该题。
4. 再练一次并标记已掌握。
5. 退出后使用恢复码，确认当前浏览器中的身份可恢复。
6. 进入管理员后台，确认没有邀请码菜单。
7. 检查后台总学生数、作答数、错题排行和常错知识点。
8. 用结构化文本批量导入题目，确认默认状态为“待确认”且不公开。

本地演示管理员账号仍为 `admin`。密码不再显示在页面中，正式上线前必须改用 Supabase Auth 管理员账号。

## 4. 创建 Supabase 项目

1. 登录 Supabase，新建一个项目。
2. 在 Authentication 设置中开启 Anonymous Sign-Ins。
3. 打开 SQL Editor。
4. 执行项目中的 `supabase/schema.sql`。
5. 检查各张表的 RLS 是否显示为已开启。
6. 在 Supabase Auth 中创建唯一管理员账号。
7. 把管理员 Auth 用户 ID 写入 `admin_users`。

成功标准：普通匿名用户只能读公开内容和自己的记录，管理员账号可以维护内容和读取汇总数据。

官方参考：

- Supabase Anonymous Sign-Ins：https://supabase.com/docs/guides/auth/auth-anonymous
- Supabase Row Level Security：https://supabase.com/docs/guides/database/postgres/row-level-security

## 5. 正式数据接入工作

目前 `data-service.js` 是本地实现。正式部署前需要增加 Supabase 实现，页面只通过数据服务读写，不直接使用 `localStorage`。

必须实现：

1. 首次进入调用 Supabase Anonymous Auth。
2. 创建 `students` 和第一条 `student_devices` 记录。
3. 公开科目、重点和题目从 Supabase 读取。
4. 作答写入 `answer_records`。
5. 错题新增或更新 `wrong_questions`。
6. AI 记录写入 `ai_logs`。
7. 科目进入记录写入 `subject_visits`。
8. 管理操作使用管理员 Supabase 会话。

## 6. 恢复码服务端接口

跨设备恢复不能在浏览器中直接查询恢复码 hash，否则会暴露敏感数据。需要新增 Vercel 服务端接口，例如 `/api/recover`：

1. 接收恢复码。
2. 检查 IP 或设备尝试频率。
3. 使用 `RECOVERY_CODE_PEPPER` 计算 hash。
4. 只在服务端查询 `student_recovery`。
5. 验证成功后，把当前 Supabase 匿名 Auth 用户写入原学生的 `student_devices`。
6. 验证失败时增加失败次数，达到上限后临时锁定。

`SUPABASE_SERVICE_ROLE_KEY` 只能用于这个服务端接口，不能传给浏览器。

## 7. 环境变量

需要在 Vercel 项目 Settings → Environment Variables 中配置：

| 变量 | 放置位置 | 作用 |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | 浏览器可用 | Supabase 项目地址 |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | 浏览器可用 | Supabase 公开密钥，权限仍受 RLS 限制 |
| `SUPABASE_SERVICE_ROLE_KEY` | 仅服务端 | 恢复身份和高权限服务操作 |
| `RECOVERY_CODE_PEPPER` | 仅服务端 | 加强恢复码 hash |
| `ADMIN_EMAIL` | 仅服务端 | 限定管理员账号 |
| `AI_API_KEY` | 仅服务端、以后再配 | 调用真实 AI |

不要把真实值写入 `.env.example`。`.env` 和 `.env.*` 已被 `.gitignore` 排除。

## 8. GitHub 与 Vercel 部署

1. 在 GitHub 创建私有仓库。
2. 把当前项目提交到仓库，提交前确认没有 `.env`。
3. 登录 Vercel，选择 Add New Project。
4. 导入 GitHub 仓库。
5. 当前静态演示版不需要构建命令，输出目录使用项目根目录。
6. 接入服务端恢复接口后，再按实际框架设置构建命令。
7. 配置上一节的环境变量。
8. 点击 Deploy。
9. 部署完成后先使用 Vercel 临时域名测试。
10. 在 Vercel Domains 中绑定自定义域名。

成功标准：公开链接可匿名进入；两台设备的数据来自同一个 Supabase 项目；学生 A 无法访问学生 B 的答题、错题和 AI 记录。

官方参考：

- Vercel Git 部署：https://vercel.com/docs/deployments/git
- Vercel 环境变量：https://vercel.com/docs/environment-variables

## 9. 上线前安全检查

- 前端代码中没有 `service_role` key 和 AI API Key。
- 管理员密码没有写在 JavaScript 中。
- 所有业务表已开启 RLS。
- 恢复码表没有学生端读取策略。
- 管理员使用独立 Supabase Auth 账号。
- 删除科目、重点和归档题目有二次确认。
- 使用两个匿名账号互相测试数据隔离。
- 对恢复接口做频率限制。
- 备份数据库并保留管理员操作日志。

## 10. 当前仍未完成的上线工作

- Supabase JavaScript 数据服务实现。
- Vercel `/api/recover` 服务端接口。
- 管理员 Supabase Auth 登录替换本地演示验证。
- 本地种子资料迁移脚本。
- 真实 60 人并发与移动端真机测试。

这些工作需要 Supabase 项目地址、publishable key 和管理员邮箱后才能连接并实际验证。
