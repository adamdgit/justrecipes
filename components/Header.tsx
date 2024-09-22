import { createClient } from "@/utils/supabase/server";
import AuthButton from "../components/AuthButton";
import SearchBar from "./SearchBar";
import Navbar from "./Navbar";

export default async function Header() {
  
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="header-span-page">
      <div className="header-wrap" title="home" style={
        user ? {'gridTemplateColumns': 'auto minmax(200px, 350px) auto auto'}
        : {'gridTemplateColumns': 'auto minmax(200px, 450px) auto'}
      }>
        <a href="/" className="brand-text">
          easy<span className="brand2">recipes</span>
        </a>
        <SearchBar />
        {user ? 
          <Navbar />
          : null}
        <AuthButton />
      </div>
    </header>
  );
}
