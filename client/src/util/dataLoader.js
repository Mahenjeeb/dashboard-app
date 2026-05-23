import { interceptorAPI } from "@/api/interceptorAPI";
import { notifyError } from "@/util/notifications";

const dataLoader = async ({ request }) => {
  const api = interceptorAPI();
  const url = new URL(request.url);
  const { pathname } = url;
  try {
    const { data } = await api.get(`/app${pathname}`);
    return data;
  } catch (error) {
    notifyError(error, "We couldn't load this page.");
    throw error;
  }
};
export default dataLoader;
