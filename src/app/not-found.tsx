import Link from "next/link";
import { site } from "@/content";

export default function NotFound() {
  return (
    <main className="closing d-flex align-items-center" style={{ minHeight: "100vh" }}>
      <div className="container-fluid h-100 flex-column text-center">
        <h1 className="marker-none">404</h1>
        <p className="mt-3">This page could not be found.</p>
        <Link href={site.routes.id.home} className="link-button mx-auto mt-4">
          <span>Back to home</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
