(function createReviewProgressService() {
  const PROGRESS_KEY = "final-review-user-progress-v1";
  const USER_ID = "anonymous-local-user";

  function now() {
    return new Date().toISOString();
  }

  function defaultProgress() {
    const timestamp = now();
    return {
      userId: USER_ID,
      subjects: {},
      questions: {},
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  }

  function defaultQuestionProgress() {
    return {
      status: "not_started",
      mastery: "unknown",
      isFavorite: false,
      isWrong: false,
      reviewCount: 0,
      lastReviewedAt: null,
    };
  }

  function readProgress() {
    try {
      const raw = window.localStorage.getItem(PROGRESS_KEY);
      if (!raw) return defaultProgress();
      const parsed = JSON.parse(raw);
      return {
        ...defaultProgress(),
        ...parsed,
        subjects: parsed && typeof parsed.subjects === "object" && parsed.subjects ? parsed.subjects : {},
        questions: parsed && typeof parsed.questions === "object" && parsed.questions ? parsed.questions : {},
      };
    } catch {
      return defaultProgress();
    }
  }

  function writeProgress(progress) {
    const current = readProgress();
    const safeProgress = {
      ...current,
      ...(progress && typeof progress === "object" ? progress : {}),
      subjects: progress && typeof progress.subjects === "object" && progress.subjects ? progress.subjects : current.subjects,
      questions: progress && typeof progress.questions === "object" && progress.questions ? progress.questions : current.questions,
      updatedAt: now(),
    };
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(safeProgress));
    } catch {
      // Keep the UI usable even if localStorage is unavailable or full.
    }
    return safeProgress;
  }

  function getQuestionProgressFrom(progress, questionId) {
    return {
      ...defaultQuestionProgress(),
      ...(progress.questions[String(questionId)] || {}),
    };
  }

  function updateQuestion(questionId, subjectId, updater) {
    const progress = readProgress();
    const id = String(questionId);
    const current = getQuestionProgressFrom(progress, id);
    progress.questions[id] = updater(current);
    if (subjectId) {
      const subjectKey = String(subjectId);
      progress.subjects[subjectKey] = {
        ...(progress.subjects[subjectKey] || {}),
        lastStudyAt: now(),
      };
    }
    return writeProgress(progress);
  }

  function getProgress() {
    return readProgress();
  }

  function saveProgress(progress) {
    return writeProgress(progress);
  }

  function getQuestionProgress(questionId) {
    const progress = readProgress();
    return getQuestionProgressFrom(progress, String(questionId));
  }

  function markReviewed(questionId, subjectId) {
    const timestamp = now();
    return updateQuestion(questionId, subjectId, (current) => ({
      ...current,
      status: "reviewed",
      reviewCount: Number(current.reviewCount || 0) + 1,
      lastReviewedAt: timestamp,
    }));
  }

  function markKnown(questionId, subjectId) {
    const timestamp = now();
    return updateQuestion(questionId, subjectId, (current) => ({
      ...current,
      status: "reviewed",
      mastery: "known",
      isWrong: false,
      lastReviewedAt: timestamp,
    }));
  }

  function markUnknown(questionId, subjectId) {
    const timestamp = now();
    return updateQuestion(questionId, subjectId, (current) => ({
      ...current,
      status: "reviewed",
      mastery: "unknown",
      isWrong: true,
      lastReviewedAt: timestamp,
    }));
  }

  function toggleFavorite(questionId) {
    const progress = readProgress();
    const id = String(questionId);
    const current = getQuestionProgressFrom(progress, id);
    const nextValue = !current.isFavorite;
    progress.questions[id] = {
      ...current,
      isFavorite: nextValue,
    };
    writeProgress(progress);
    return nextValue;
  }

  function setCurrentQuestion(subjectId, questionId) {
    const progress = readProgress();
    const subjectKey = String(subjectId);
    progress.subjects[subjectKey] = {
      ...(progress.subjects[subjectKey] || {}),
      currentQuestionId: questionId ? String(questionId) : null,
      lastStudyAt: now(),
    };
    writeProgress(progress);
  }

  function getCurrentQuestion(subjectId) {
    const progress = readProgress();
    return progress.subjects[String(subjectId)]?.currentQuestionId || null;
  }

  function getSubjectStats(subjectId, questions) {
    const progress = readProgress();
    const subjectQuestions = Array.isArray(questions) ? questions : [];
    const stats = subjectQuestions.reduce((summary, question) => {
      const questionProgress = getQuestionProgressFrom(progress, question.id);
      summary.total += 1;
      if (questionProgress.status === "reviewed") summary.reviewed += 1;
      else summary.notStarted += 1;
      if (questionProgress.mastery === "known") summary.known += 1;
      if (questionProgress.mastery === "unknown" && questionProgress.status === "reviewed") summary.unknown += 1;
      if (questionProgress.isWrong) summary.wrong += 1;
      if (questionProgress.isFavorite) summary.favorite += 1;
      return summary;
    }, {
      subjectId,
      total: 0,
      reviewed: 0,
      notStarted: 0,
      known: 0,
      unknown: 0,
      wrong: 0,
      favorite: 0,
      progressPercent: 0,
    });
    stats.progressPercent = stats.total ? Math.round((stats.reviewed / stats.total) * 100) : 0;
    return stats;
  }

  window.ReviewProgressService = {
    getProgress,
    saveProgress,
    getQuestionProgress,
    markReviewed,
    markKnown,
    markUnknown,
    toggleFavorite,
    setCurrentQuestion,
    getCurrentQuestion,
    getSubjectStats,
  };
})();
