import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { getSearchSuggestionsForUser } from "@/api/searchAPI";

const SearchBox = ({ title }) => {
  const [suggestionData, setSuggestionData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const { mutate } = useMutation({
    mutationKey: ["USER_SEARCH_SUGGESTIONS"],
    mutationFn: getSearchSuggestionsForUser,
    onSuccess: setSuggestionData,
  });
  const handleSearchChange = (e) => {
    const nextValue = e.target.value;
    setSearchInput(nextValue);
    !nextValue.trim() && setSuggestionData([]);
  };

  const handleSuggestionClick = (email) => {
    setSearchInput(email);
    setShowSuggestions(false);
  };

  const handleBlurSearch = (e) => {
    setShowSuggestions(false);
    console.log(e.target.value);
  };

  useEffect(() => {
    const trimmed = searchInput.trim();
    if (!trimmed) return undefined;
    const timerId = setTimeout(() => {
      mutate(trimmed);
    }, 300);
    return () => {
      clearTimeout(timerId);
    };
  }, [mutate, searchInput]);
  return (
    <>
      <form
        className="relative w-full"
        onSubmit={(event) => event.preventDefault()}
      >
        <button
          className="pointer-events-none absolute left-0 top-0 flex h-10 w-9 items-center justify-center text-slate-500"
          type="button"
        >
          <Search className="size-4" />
        </button>
        <input
          aria-label={`Search ${title}`}
          className="h-10 w-full rounded-lg border border-slate-300 bg-slate-100 pl-9 pr-3 text-sm font-medium text-slate-800 outline-none transition-colors placeholder:text-slate-500 hover:border-slate-400 focus:border-slate-500 focus:bg-white focus:ring-2 focus:ring-slate-200"
          placeholder={`Search ${title}`}
          type="search"
          value={searchInput}
          onChange={(e) => {
            handleSearchChange(e);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={(e) => handleBlurSearch(e)}
        />
        {showSuggestions && suggestionData.length > 0 && (
          <div className="absolute left-0 right-0 top-11 z-30 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-900/10">
            <ul className="max-h-72 overflow-y-auto" role="listbox">
              {suggestionData.map((user) => (
                <li key={user._id}>
                  <div className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-100">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                      <Search className="size-3.5" />
                    </span>
                    <button
                      type="button"
                      className="min-w-0 flex-1 truncate font-medium"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSuggestionClick(user.email)}
                    >
                      {user.email}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </>
  );
};

export default SearchBox;
