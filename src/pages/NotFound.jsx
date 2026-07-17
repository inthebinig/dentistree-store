import React from "react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <main className="section py-24 text-center">
      <Seo title="Page not found" />
      <h1 className="font-display text-3xl font-semibold text-pine-ink">Page not found</h1>
      <p className="mt-2 text-sm text-steel">That page doesn't exist, or has moved.</p>
      <Link to="/" className="btn-primary inline-flex mt-8">
        Back to home
      </Link>
    </main>
  );
}
