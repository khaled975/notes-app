import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

function Searchbar({ value, onChange, clearSearch, handleSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-100 w-40 sm:w-80 rounded-md px-3 py-2"
    >
      <div className="flex items-center justify-between gap-2">
        <input
          type="text"
          placeholder="Search Notes..."
          className="outline-none px-3 w-full"
          value={value}
          onChange={onChange}
        />
        {value && (
          <IoMdClose
            className="text-slate-400 hover:text-black text-[18px]"
            onClick={clearSearch}
          />
        )}
        <FaMagnifyingGlass
          className="text-slate-400 hover:text-black"
          onClick={handleSearch}
        />
      </div>
    </form>
  );
}

export default Searchbar;
