import AuthButton from "../components/AuthButton";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";

export default async function Header() {

  return (
    <header className="header-span-page">
      <div className="header-wrap">
        <h1>Just Recipes</h1>
        <SearchBar />
        <AuthButton />
        <Navigation />
      </div>
    </header>
  );
}
