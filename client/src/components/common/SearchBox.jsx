import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { searchSuggestion, searchData } from "@/api/searchAPI";

const SearchBox = ({ title, setTableSearchData, collection }) => {
  const [suggestionData, setSuggestionData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const hasMounted = useRef(false);

  const handleSearchChange = (e) => {
    const nextValue = e.target.value;
    setSearchInput(nextValue);
    !nextValue.trim() && setSuggestionData([]);
  };

  const handleSuggestionClick = (email) => {
    setSearchInput(email);
    setShowSuggestions(false);
  };

  const handleBlurSearch = () => {
    setShowSuggestions(false);
  };
  const getSearchSuggestion = useCallback(
    async (searchParamas, collection) => {
      const suggestionData = await searchSuggestion(searchParamas, collection);
      if (!suggestionData) return;
      setSuggestionData(suggestionData);
    },
    [setSuggestionData],
  );
  const getSearchData = useCallback(
    async (searchParamas, collection) => {
      const searchResult = await searchData(searchParamas, collection);
      if (!searchResult) return;
      const formattedSearchData = searchResult.map((row) => ({
        ...row,
        status: (row.isActive ? "Active" : "Inactive") || row.accepted,
        lastActive: row.updatedAt || row.expireAt
      }));
      setTableSearchData(formattedSearchData);
    },
    [setTableSearchData],
  );

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return undefined;
    }

    const trimmed = searchInput.trim();
    const timerId = setTimeout(() => {
      if (trimmed) {
        getSearchSuggestion(trimmed, collection);
      }
      getSearchData(trimmed, collection);
    }, 300);
    return () => {
      clearTimeout(timerId);
    };
  }, [getSearchData, getSearchSuggestion, searchInput, collection]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchBoxValue = formData.get("search");
    getSearchData(searchBoxValue, collection);
  };
  return (
    <>
      <form
        className="relative w-full"
        onSubmit={(event) => handleSubmit(event)}
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
          name="search"
          value={searchInput}
          onChange={(e) => {
            handleSearchChange(e);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => handleBlurSearch()}
        />
        {showSuggestions && suggestionData.length > 0 && (
          <div className="absolute left-0 right-0 top-11 z-30 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-xl shadow-slate-900/10">
            <ul className="max-h-72 overflow-y-auto" role="listbox">
              {suggestionData.map((user) => (
                <li key={user._id}>
                  <div className="transition-colors hover:bg-slate-50">
                    <button
                      type="button"
                      className="flex w-full min-w-0 flex-col items-start px-4 py-2.5 text-left"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSuggestionClick(user.email)}
                    >
                      <span className="w-full truncate text-sm font-medium text-slate-800">
                        {user.email || user.role}
                      </span>
                      {user.email && user.role && (
                        <span className="mt-0.5 w-full truncate text-xs capitalize text-slate-500">
                          {user.role}
                        </span>
                      )}
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
