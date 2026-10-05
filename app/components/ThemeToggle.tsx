"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./theme";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

// Unknown on the server; the button renders a neutral placeholder until hydrated.
function getServerSnapshot(): Theme | null {
  return null;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  }

  const label =
    theme === null
      ? "Toggle color theme"
      : `Switch to ${theme === "dark" ? "light" : "dark"} mode`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="theme-toggle inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium"
    >
      <span aria-hidden="true">
        {theme === null ? "◐" : theme === "dark" ? "☾" : "☀"}
      </span>
      <span>{theme === null ? "Theme" : theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
