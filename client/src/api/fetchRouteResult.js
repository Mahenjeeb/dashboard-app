import { interceptorAPI } from "@/api/interceptorAPI";
const fetchRouteResult = async (pathname) => {
  const apiInstance = interceptorAPI();
  const { data } = await apiInstance.get(`/app${pathname}`);
  return data;
};
export default fetchRouteResult;
