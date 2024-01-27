"use server";
import { cookies, headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { fetchData } from "@/utils/utils";
import { slackMessage } from "@/utils/constants";

export const signIn = async (prevState: any, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error, data } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { message: error.message, error: true };

  redirect(`/user/${data.user?.id}/dashboard`);
};

export const signUp = async (formData: FormData) => {
  "use server";

  const origin = headers().get("origin");

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const supabase = createClient(cookies());

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/callback`, data: { name } },
  });

  if (error) return redirect(`/login?message=${error.message}`);

  fetchData(process.env.SLACK_MESSAGING_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: slackMessage(email, "User", new Date().toLocaleString()),
    }),
  });

  return redirect("/login?message=Check email to continue sign in process");
};