"use client";
import Link from "next/link";
import { signUp } from "@/utils/actions";
import { Button } from "@nextui-org/button";
import { useFormStatus } from "react-dom";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="grid w-full flex-1 grid-cols-2 justify-center gap-2 p-40">
      <div>
        <h2 className={"text-2xl"}>Attendance-ms</h2>
        <p className={"text-foreground/50"}>
          Create an account to manage and maintain your attendance data
        </p>
      </div>
      <form
        className="animate-in mx-auto flex w-96 flex-col gap-2 text-foreground"
        action={signUp}
      >
        <h2 className={"text-center text-3xl"}>Signup Form</h2>
        <label htmlFor="name">Name</label>
        <input
          className="input mb-2"
          name="name"
          placeholder="john doe"
          required
        />
        <label htmlFor="email">Email</label>
        <input
          className="input mb-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="input mb-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton />
        <div className={"text-center text-foreground/70"}>OR</div>
        <Link href={"/login"} className="btn btn-neutral text-center">
          Login
        </Link>
        {searchParams?.message && (
          <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      color="secondary"
      type={"submit"}
      className={"btn-primary"}
      isLoading={pending}
    >
      Signup
    </Button>
  );
}