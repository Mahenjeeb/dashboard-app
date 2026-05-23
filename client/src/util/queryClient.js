import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { notifyError } from "@/util/notifications";

const shouldShowQueryError = (query) => query.queryKey?.[0] !== "authMe";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (shouldShowQueryError(query)) {
        notifyError(error, "We couldn't load the requested data.");
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.meta?.skipErrorToast) {
        return;
      }

      notifyError(error, "We couldn't save your changes.");
    },
  }),
});

/*defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  }, */
