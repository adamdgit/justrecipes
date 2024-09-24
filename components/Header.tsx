import { createClient } from "@/utils/supabase/server";
import AuthButton from "../components/AuthButton";
import SearchBar from "./SearchBar"

export default async function Header() {

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <header className="header-span-page">
      <div className="header-wrap" title="home">
        <a href="/" className="brand-text">
          easy<span className="brand2">recipes</span>
        </a>
        <SearchBar />
        <AuthButton user={user}/>
      </div>
    </header>
  );
}
