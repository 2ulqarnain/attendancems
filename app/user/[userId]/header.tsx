"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { SupabaseClient, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PiMountainsFill } from "react-icons/pi";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/avatar";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.onAuthStateChange(() => {});
  }, []);

  supabase.auth.getUser().then(({ data }) => setUser(data?.user));

  const signOut = async (supabase: SupabaseClient<any, "public", any>) => {
    supabase.auth.signOut().then((error) => {
      if (error) console.error(error);
      toast.success("Logged out successfully!");
      router.replace("/login");
    });
  };

  return (
    <header
      className={
        "col-span-2 flex w-full items-center justify-between gap-2 bg-indigo-950 p-2 text-indigo-50"
      }
    >
      <div
        className={
          "flex aspect-square w-10 items-center justify-center rounded-lg bg-indigo-900"
        }
      >
        <PiMountainsFill />
      </div>
      <div className={"mr-auto"}>
        <span className={"text-xl font-medium"}>Attendance-ms</span>
        <p className={"text-xs text-indigo-300"}>Your Attendance Manager</p>
      </div>
      <UserMenu
        email={user?.email ?? "loading..."}
        logout={() => {
          signOut(supabase);
        }}
      />
    </header>
  );
}

function UserMenu({ email, logout }: { email: string; logout: () => void }) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar as="button" className="transition-transform" name="ZH" />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Profile Actions"
        variant="flat"
        disabledKeys={["email"]}
      >
        <DropdownItem key="email" className="h-14 gap-2 pl-3">
          <p>Signed in as</p>
          <p>{email}</p>
        </DropdownItem>
        <DropdownItem
          onClick={logout}
          key="logout"
          color={"danger"}
          className={"rounded-full pl-3 hover:text-white"}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}