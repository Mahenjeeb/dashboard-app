import { interceptorAPI } from "@/api/interceptorAPI";
const api = interceptorAPI();
export const searchSuggestion = async (searchParams, collection) => {
  const { data } = await api.get("/app/get_search_suggestion", {
    params: {
      collection,
      searchParams,
    },
  });
  return data;
};

export const searchData = async (searchParams, collection) => {
  const { data } = await api.get(`/app/search`, {
    params: {
      collection,
      searchParams
    },
  });
  return data;
};
