export const THEME_STORAGE_KEY = "theme";

// Runs in <head> before first paint (see app/layout.tsx): use the saved
// choice, otherwise fall back to the OS preference.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
