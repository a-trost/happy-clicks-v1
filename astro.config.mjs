import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import turbolinks from "@astrojs/turbolinks";

// import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://happyclicks.dev",
  integrations: [svelte(), preact(), sitemap(), turbolinks()],
});
