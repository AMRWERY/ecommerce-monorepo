export type SeoPageOptions = {
  /** Page-specific title segment. Omit for the homepage to use the bare site name. */
  title?: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "product";
  /** Keep pages with no public/canonical value (checkout, account, auth) out of search results. */
  noindex?: boolean;
};
