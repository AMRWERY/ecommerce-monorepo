import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { config } from "dotenv";

const currentDir = dirname(fileURLToPath(import.meta.url));
const rootDir = join(currentDir, "../..");

// Load environment variables from root .env file
config({ path: join(rootDir, ".env") });

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@vee-validate/nuxt",
    "@nuxtjs/supabase",
  ],
  tailwindcss: {
    cssPath: fileURLToPath(
      new URL("./assets/css/tailwind.css", import.meta.url),
    ),
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  i18n: {
    locales: [
      { code: "en", iso: "en-US", file: "en.json", name: "English" },
      {
        code: "ar",
        iso: "ar-EG",
        file: "ar.json",
        name: "العربية",
        dir: "rtl",
      },
    ],
    defaultLocale: "en",
    strategy: "prefix",
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      fallbackLocale: "en",
      redirectOn: "root",
    },
  },
  veeValidate: {
    autoImports: true,
  },
  supabase: {
    redirect: false,
    types: false,
    cookieOptions: {
      // maxAge: 60 * 60 * 24 * 7, // 7 days (Commented out to make it a session cookie - clears on browser close)
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
  // @nuxtjs/supabase's client plugin imports @supabase/ssr, which imports the
  // CJS `cookie` package with a named import. Under Vite dev, that fails to
  // resolve unless `cookie` is pre-bundled — which requires it to be a direct
  // dependency of the consuming app (not just a transitive one), since
  // optimizeDeps resolves relative to the app root.
  vite: {
    optimizeDeps: {
      include: ["cookie"],
    },
  },
  css: [join(currentDir, "./assets/css/main.css")],
  alias: {
    "@": rootDir,
    "@types": join(currentDir, "types"),
    "@locales": join(currentDir, "locales"),
    "@assets": join(currentDir, "assets"),
    "@public": join(currentDir, "public"),
  },
  components: [
    {
      path: join(currentDir, "components"),
      pathPrefix: false,
    },
  ],
  hooks: {
    ready(nuxt) {
      // Upstream @pinia/nuxt's app:rendered hook re-fetches useNuxtApp() instead of
      // using the nuxtApp captured in its setup() closure, which can resolve to a
      // context missing $pinia under Nuxt 4's async context handling, crashing SSR
      // on every request. Removed here in favor of app/plugins/pinia-ssr.ts, which
      // does the same payload serialization but reuses the closure reference.
      // https://github.com/vuejs/pinia/discussions/3067
      nuxt.options.plugins = nuxt.options.plugins.filter((p) => {
        const src = typeof p === "string" ? p : p.src;
        return !src.includes("@pinia/nuxt/dist/runtime/plugin");
      });
    },
  },
  app: {
    head: {
      title: "Bazario",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        },
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          charset: "utf-8",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});