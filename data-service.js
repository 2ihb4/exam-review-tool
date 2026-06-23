(function createReviewDataService() {
  const local = {
    mode: "local-demo",
    get(key) {
      return window.localStorage.getItem(key);
    },
    set(key, value) {
      window.localStorage.setItem(key, value);
    },
  };

  // The UI uses this small boundary instead of accessing storage directly.
  // A Supabase implementation can replace it without rewriting page rendering.
  window.ReviewDataService = local;
})();
