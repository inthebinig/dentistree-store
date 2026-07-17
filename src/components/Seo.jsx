import { useEffect } from "react";

// Minimal per-page SEO without pulling in react-helmet: sets the document
// title and description meta tag on mount, and restores the site defaults
// on unmount so navigating away doesn't leave stale metadata behind.
export default function Seo({ title, description }) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content");

    if (title) document.title = `${title} · DentisTree`;
    if (description && metaDesc) metaDesc.setAttribute("content", description);

    return () => {
      document.title = prevTitle;
      if (metaDesc && prevDesc) metaDesc.setAttribute("content", prevDesc);
    };
  }, [title, description]);

  return null;
}
