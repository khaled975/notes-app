import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import ProfileInfo from "./ProfileInfo";
import { useState } from "react";

function Navbar({ userName, onLogout, handleSearch, handleClearSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const clearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <header className="w-full shadow-md flex px-3 py-4">
      <nav className="w-full flex items-center justify-between gap-[8px] md:gap-0">
        <Link to="/" className="font-bold">
          NotesApp
        </Link>
        {userName && (
          <>
            <Searchbar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              clearSearch={clearSearch}
              handleSearch={() => handleSearch(searchQuery)}
            />
            <ProfileInfo userName={userName} onLogout={onLogout} />
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
