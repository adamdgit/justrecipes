import AuthButton from "../components/AuthButton";
import SearchBar from "./SearchBar";
import Navigation from "./Navigation";

export default async function Header() {

  return (
    <header className="header-span-page">
      <div className="header-wrap" title="home">
        <a href="/" className="brand-text">
          <span className="brand1">just</span> <span className="brand2">recipes</span>
        </a>
        <SearchBar />
        <AuthButton />
      </div>
    </header>
  );
}
