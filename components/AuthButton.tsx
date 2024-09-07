import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="user-wrapper">
      {user.email}
      <form action={signOut}>
        <button className="auth-btn logout">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="auth-btn login"
    >
      Login
    </Link>
  );
}
