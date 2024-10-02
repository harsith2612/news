import { useRef } from "react";

const SearchArticle = ({ setQuery, ctype }) => {
  const searchInputRef = useRef(null);

  const searchArticle = () => {
    const searchValue = searchInputRef.current.value.trim();
    
    if (!searchValue) return; 

    const searchQuery = ctype ? `${ctype} and ${searchValue}` : searchValue;

    setQuery((prev) => ({ ...prev, keyword: searchQuery }));

    searchInputRef.current.value = ""; 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchArticle(); 
  };

  return (
    <div className="flex items-center pt-1">
      <input
        type="text"
        className="w-60 border px-3 py-1 rounded-s-lg h-9 outline-none border-gray-200 focus:ring-white focus:border-gray-200"
        ref={searchInputRef}
        onKeyDown={handleKeyDown}
        placeholder="Search..."
      />
      <button
        className="px-2 py-1.5 bg-sky-500 text-white h-9 rounded-e-lg"
        onClick={searchArticle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchArticle;
