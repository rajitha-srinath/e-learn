"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [{ name: "My Courses", href: "/dashboard/courses" }];

  return (
    <div className="flex min-h-screen max-w-7xl m-auto">
      <aside className="w-54 p-4 border-r">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn("rounded px-3 py-2 hover:bg-muted")}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
