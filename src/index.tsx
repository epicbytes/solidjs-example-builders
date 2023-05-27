/* @refresh reload */
import { render } from "solid-js/web";
import "@/index.css";
import { App } from "@/app";
import { Router, hashIntegration } from "@solidjs/router";
import { languages_dictionary } from "@/shared/data/i18n-dictionary";
import { createI18nContext, I18nContext } from "@solid-primitives/i18n";
import "@/shared/utils/extentions";
import { PageBuilderProvider } from "@/shared/builder/page-builder-context";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  );
}
const value = createI18nContext(languages_dictionary, "en");

render(
  () => (
    <I18nContext.Provider value={value}>
      <PageBuilderProvider>
        <Router source={hashIntegration()}>
          <App />
        </Router>
      </PageBuilderProvider>
    </I18nContext.Provider>
  ),
  root!
);
