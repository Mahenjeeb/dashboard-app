import { interceptorAPI } from "@/api/interceptorAPI";
const api = interceptorAPI();
export const getSearchSuggestionsForUser = async (query) => {
  const { data } = await api.post("/app/users/get_search_suggestion", {
    query,
  });
  return data;
};

export const searchUsers = async (query) => {
  const { data } = await api.get(`/app/users/search`, {
    params: {
      query,
    },
  });
  return data;
};
