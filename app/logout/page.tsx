"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  createClient()
    .auth.signOut()
    .then(() => {
      router.push("/login");
    });
  return <p className={"flex flex-1 flex-col justify-center"}>Logged out</p>;
}