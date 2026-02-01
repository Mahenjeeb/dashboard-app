import { useQuery } from "@tanstack/react-query";
import fetchRouteResult from "@/api/fetchRouteResult";
const useGetdata = (pathname) => {
  return useQuery({
    queryKey: ["routeData", pathname],
    queryFn: () => fetchRouteResult(pathname),
  });
};
export default useGetdata;
