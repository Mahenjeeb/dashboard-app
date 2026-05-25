import { interceptorAPI } from "@/api/interceptorAPI";
const api = interceptorAPI();
export const getSearchSuggestionsForUser = async (query) => {
  const { data } = await api.post("/app/users/get_search_suggestion", {
    query,
  });
  return data;
};

