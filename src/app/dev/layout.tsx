import { notFound } from "next/navigation";

export default function DevelopmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  if (process.env.NODE_ENV === "production") notFound();
  return children;
}
