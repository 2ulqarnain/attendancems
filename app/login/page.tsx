"use client";
import Link from "next/link";
import { signIn } from "@/utils/actions";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { useEffect } from "react";
import { Button } from "@nextui-org/button";

export default function Login() {
  const [state, signInAction] = useFormState(signIn, {
    message: "",
    error: false,
  });

  useEffect(() => {
    state.error && toast.error(state.message);
  }, [state]);

  return (
    <div className="grid w-full flex-1 grid-cols-2 justify-center gap-2 p-40">
      <div>
        <h2 className={"text-2xl"}>Attendance-ms</h2>
        <p className={"text-foreground/50"}>
          Login to your account to access your attendance data
        </p>
      </div>
      <form
        className="animate-in mx-auto flex w-96 flex-col gap-2 text-foreground"
        action={signInAction}
      >
        <h2 className={"text-center text-3xl"}>Login Form</h2>
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
        <button className="btn-neutral mb-2 text-sm" type={"button"}>
          Forgot Password ?
        </button>
        <SubmitButton />
        <div className={"text-center text-foreground/70"}>OR</div>
        <Link href={"/signup"} className="btn btn-neutral text-center">
          Sign Up
        </Link>
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
      Login
    </Button>
  );
}