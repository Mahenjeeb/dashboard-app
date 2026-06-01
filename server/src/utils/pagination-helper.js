import { getCollectionModel } from "./search-helper.js";
async function paginationOnCollections(pageNumber, collection, limit) {
  const MODEL = getCollectionModel(collection);
  const OFFSET = (pageNumber - 1) * limit;
  const totalItems = await MODEL.countDocuments({});
  const totalPages = Math.ceil(totalItems / 10);
  const pageData = await MODEL.find().skip(OFFSET).limit(limit).select("-__v -password -refreshToken");
  return { totalItems, totalPages, pageData };
}
export default paginationOnCollections;
