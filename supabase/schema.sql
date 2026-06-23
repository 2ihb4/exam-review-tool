create extension if not exists pgcrypto;

create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  exam_date date,
  exam_time text,
  exam_location text,
  is_open boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  anonymous_user_id uuid not null unique references auth.users(id) on delete cascade,
  nickname text not null default '匿名同学',
  created_at timestamptz not null default now(),
  last_active_at timestamptz not null default now()
);

create table if not exists public.student_devices (
  student_id uuid not null references public.students(id) on delete cascade,
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (student_id, auth_user_id)
);

-- Only server-side recovery code handlers may access this table.
create table if not exists public.student_recovery (
  student_id uuid primary key references public.students(id) on delete cascade,
  recovery_code_hash text not null,
  failed_attempts integer not null default 0,
  locked_until timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists public.key_points (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  chapter text not null default '',
  sort_order integer not null default 0,
  title text not null,
  content text not null default '',
  page_number text,
  importance text not null default 'medium' check (importance in ('high', 'medium', 'low')),
  source text not null default '',
  is_ai_knowledge boolean not null default true,
  is_public boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  chapter text not null default '',
  question_type text not null,
  question_content text not null,
  options jsonb not null default '[]'::jsonb,
  correct_answer text not null default '',
  explanation text not null default '',
  source text not null default '',
  difficulty text not null default 'medium' check (difficulty in ('easy', 'medium', 'hard')),
  importance text not null default 'medium' check (importance in ('high', 'medium', 'low')),
  prediction_level text not null default 'medium' check (prediction_level in ('high', 'medium', 'low')),
  is_prediction boolean not null default false,
  is_self_test boolean not null default false,
  is_ai_knowledge boolean not null default false,
  is_public boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'pending_review', 'published', 'hidden', 'archived')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.question_key_points (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.questions(id) on delete cascade,
  key_point_id uuid not null references public.key_points(id) on delete cascade,
  unique (question_id, key_point_id)
);

create table if not exists public.answer_records (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  answer_content text not null default '',
  is_correct boolean not null,
  score numeric(5,2),
  used_time integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.wrong_questions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  question_id uuid not null references public.questions(id) on delete cascade,
  wrong_count integer not null default 1,
  last_wrong_at timestamptz not null default now(),
  mastery_status text not null default '未掌握' check (mastery_status in ('未掌握', '复习中', '已掌握')),
  next_review_at timestamptz,
  unique (student_id, question_id)
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  key_point_id uuid not null references public.key_points(id) on delete cascade,
  student_id uuid references public.students(id) on delete set null,
  parent_id uuid references public.comments(id) on delete cascade,
  content text not null,
  is_admin_reply boolean not null default false,
  status text not null default 'published' check (status in ('published', 'deleted')),
  created_at timestamptz not null default now()
);

create table if not exists public.ai_logs (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  question text not null,
  answer text not null,
  hit_status boolean not null default false,
  cited_sources jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.subject_visits (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.students(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.operation_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admin_users where id = auth.uid()) $$;

create or replace function public.owns_student(target_student_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.student_devices where student_id = target_student_id and auth_user_id = auth.uid()) $$;

alter table public.subjects enable row level security;
alter table public.students enable row level security;
alter table public.student_devices enable row level security;
alter table public.student_recovery enable row level security;
alter table public.admin_users enable row level security;
alter table public.key_points enable row level security;
alter table public.questions enable row level security;
alter table public.question_key_points enable row level security;
alter table public.answer_records enable row level security;
alter table public.wrong_questions enable row level security;
alter table public.comments enable row level security;
alter table public.ai_logs enable row level security;
alter table public.subject_visits enable row level security;
alter table public.operation_logs enable row level security;

create policy "public reads open subjects" on public.subjects for select using (is_open or public.is_admin());
create policy "admin manages subjects" on public.subjects for all using (public.is_admin()) with check (public.is_admin());

create policy "student reads own profile" on public.students for select using (public.owns_student(id));
create policy "student creates own profile" on public.students for insert with check (anonymous_user_id = auth.uid());
create policy "student updates own profile" on public.students for update using (public.owns_student(id)) with check (public.owns_student(id));
create policy "admin reads students" on public.students for select using (public.is_admin());

create policy "student reads own device" on public.student_devices for select using (auth_user_id = auth.uid());
create policy "student creates first device" on public.student_devices for insert with check (
  auth_user_id = auth.uid() and exists (
    select 1 from public.students s where s.id = student_id and s.anonymous_user_id = auth.uid()
  )
);
create policy "admin reads devices" on public.student_devices for select using (public.is_admin());

create policy "public reads key points" on public.key_points for select using (is_public or public.is_admin());
create policy "admin manages key points" on public.key_points for all using (public.is_admin()) with check (public.is_admin());

create policy "public reads published questions" on public.questions for select using ((is_public and status = 'published') or public.is_admin());
create policy "admin manages questions" on public.questions for all using (public.is_admin()) with check (public.is_admin());
create policy "public reads question links" on public.question_key_points for select using (
  exists (select 1 from public.questions q where q.id = question_id and q.is_public and q.status = 'published') or public.is_admin()
);
create policy "admin manages question links" on public.question_key_points for all using (public.is_admin()) with check (public.is_admin());

create policy "student reads own answers" on public.answer_records for select using (public.owns_student(student_id));
create policy "student creates own answers" on public.answer_records for insert with check (public.owns_student(student_id));
create policy "admin reads answers" on public.answer_records for select using (public.is_admin());

create policy "student reads own wrong questions" on public.wrong_questions for select using (public.owns_student(student_id));
create policy "student creates own wrong questions" on public.wrong_questions for insert with check (public.owns_student(student_id));
create policy "student updates own wrong questions" on public.wrong_questions for update using (public.owns_student(student_id)) with check (public.owns_student(student_id));
create policy "admin reads wrong questions" on public.wrong_questions for select using (public.is_admin());

create policy "public reads comments" on public.comments for select using (status = 'published' or public.is_admin());
create policy "student creates comments" on public.comments for insert with check (public.owns_student(student_id) and not is_admin_reply);
create policy "admin manages comments" on public.comments for all using (public.is_admin()) with check (public.is_admin());

create policy "student reads own ai logs" on public.ai_logs for select using (public.owns_student(student_id));
create policy "student creates own ai logs" on public.ai_logs for insert with check (public.owns_student(student_id));
create policy "admin reads ai logs" on public.ai_logs for select using (public.is_admin());

create policy "student creates own visits" on public.subject_visits for insert with check (public.owns_student(student_id));
create policy "admin reads visits" on public.subject_visits for select using (public.is_admin());
create policy "admin reads operation logs" on public.operation_logs for select using (public.is_admin());
create policy "admin creates operation logs" on public.operation_logs for insert with check (public.is_admin());

create index if not exists answer_records_student_created_idx on public.answer_records (student_id, created_at desc);
create index if not exists answer_records_question_idx on public.answer_records (question_id);
create index if not exists wrong_questions_student_idx on public.wrong_questions (student_id, mastery_status, wrong_count desc);
create index if not exists ai_logs_subject_created_idx on public.ai_logs (subject_id, created_at desc);
create index if not exists subject_visits_subject_created_idx on public.subject_visits (subject_id, created_at desc);

-- No client policy is intentionally created for student_recovery or admin_users.
-- Recovery verification and admin provisioning must run on a trusted server only.
