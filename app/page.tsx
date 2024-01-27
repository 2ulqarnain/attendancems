import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";

export default async function Index() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {data} = await supabase.auth.getUser()
  redirect(data.user?`/user/${data.user.id}/dashboard`:"/login")
}