import type { SeoPageOptions } from "@/types/useSeoPage";

const SITE_NAME = "SHOP.CO";
const DEFAULT_OG_IMAGE = "/img/hero-section.png";

export const useSeoPage = (options: SeoPageOptions) => {
  const {
    title,
    description,
    image,
    type = "website",
    noindex = false,
  } = options;

  const requestUrl = useRequestURL();
  const canonicalUrl = `${requestUrl.origin}${requestUrl.pathname}`;
  const pageTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const ogImage = image || DEFAULT_OG_IMAGE;

  useHead({
    link: [{ rel: "canonical", href: canonicalUrl }],
    meta: noindex ? [{ name: "robots", content: "noindex, nofollow" }] : [],
  });

  useSeoMeta({
    title: pageTitle,
    description,
    ogTitle: pageTitle,
    ogDescription: description,
    ogImage,
    ogType: type,
    ogUrl: canonicalUrl,
    ogSiteName: SITE_NAME,
    twitterCard: image ? "summary_large_image" : "summary",
    twitterTitle: pageTitle,
    twitterDescription: description,
    twitterImage: ogImage,
  });
};
