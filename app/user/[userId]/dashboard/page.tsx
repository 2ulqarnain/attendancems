import {createClient} from "@/utils/supabase/server";
import {cookies} from "next/headers";

export default async function Page(){

    const supabase = createClient(cookies())
    const {data:{user}} = await supabase.auth.getUser()
    
    return <p>Hello, {user?.user_metadata?.name}</p>
}