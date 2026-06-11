import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Portfolio CMS",
  robots: { index: false, follow: false }, // never index admin page
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
