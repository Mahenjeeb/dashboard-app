import React, { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { getSearchSuggestionsForUser, searchUsers } from "@/api/searchAPI";

const SearchBox = ({ title, setTableSearchData }) => {
  const [suggestionData, setSuggestionData] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const hasMounted = useRef(false);

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

  const handleBlurSearch = () => {
    setShowSuggestions(false);
  };

  const generateSearchDataForTable = useCallback(
    async (value) => {
      const usersSearchData = await searchUsers(value);
      if (!usersSearchData) return;
      const formattedSearchData = usersSearchData.map((row) => ({
        id: row._id,
        email: row.email,
        role: row.role,
        status: row.isActive ? "Active" : "Inactive",
        lastActive: row.updatedAt,
        action: "Action",
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
        mutate(trimmed);
      }
      generateSearchDataForTable(trimmed);
    }, 300);
    return () => {
      clearTimeout(timerId);
    };
  }, [generateSearchDataForTable, mutate, searchInput]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const searchBoxValue = formData.get("search");
    generateSearchDataForTable(searchBoxValue);
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
