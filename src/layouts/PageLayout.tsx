import { type ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return <div className="min-h-screen max-w-xl bg-background p-4">{children}</div>;
}
