import { interceptorAPI } from "@/api/interceptorAPI";
const dataLoader = async ({ request }) => {
  const api = interceptorAPI();
  const url = new URL(request.url);
  const { pathname } = url;
  const { data } = await api.get(`/app${pathname}`);
  return data;
};
export default dataLoader;
