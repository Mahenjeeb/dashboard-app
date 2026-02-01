export const commonLoader = async ({ request }) => new URL(request.url).pathname;
