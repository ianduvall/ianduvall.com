(function determineColorMode() {
  try {
    if (typeof window === 'undefined') {
      return;
    }

    let themeClass = '';

    themeClass = localStorage.getItem('color_theme');

    if (!themeClass || !['dark-theme', 'light-theme'].includes(themeClass)) {
      const mql = window.matchMedia('(prefers-color-scheme: dark)');
      const hasMediaQueryPreference = typeof mql.matches === 'boolean';
      if (hasMediaQueryPreference) {
        themeClass = mql.matches ? 'dark-theme' : 'light-theme';
      }
    }

    if (document.body && themeClass) {
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(themeClass);
    }
  } catch (error) {}
})();
