import { ReactNode } from "react";
import Header from "@/app/user/[userId]/header";
import { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#1e1b4b",
};

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className={
        "relative grid w-screen grid-cols-[auto,1fr] grid-rows-[auto,1fr]"
      }
    >
      <Header />
      <div>{children}</div>
    </div>
  );
}