import { createClient } from "@/utils/supabase/server";
import AuthButton from "../components/AuthButton";
import SearchBar from "./SearchBar";

export default async function Header() {



  return (
    <div className="nav-wrapper">
      <nav className="navbar">
        <h1>Just Recipes</h1>
        <SearchBar />
        <AuthButton />
      </nav>
    </div>
  );
}
