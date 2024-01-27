import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "@/app/providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className + " dark"}>
      <body className="bg-background text-foreground">
        <main className="flex h-full w-full flex-col items-center">
          <Providers>{children}</Providers>
          <Toaster
            position={"top-center"}
            toastOptions={{
              unstyled: true,
              classNames: {
                error: "toast toast-error",
                success: "toast toast-success",
              },
            }}
          />
        </main>
      </body>
    </html>
  );
}