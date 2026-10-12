import { siteUrl } from "@/data/seo";

export default function sitemap() {
  return [{ url: siteUrl, lastModified: new Date() }];
}