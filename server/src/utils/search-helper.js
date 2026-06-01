import { MODEL_MAP, SEARCH_FIELDS } from "../config/searchConfig.js";

function getCollectionModel(name) {
  if (!MODEL_MAP[name]) {
    throw new Error("Invalid Collection Requested");
  }
  return MODEL_MAP[name];
}
function setSearchFields(collection, searchParams) {
  const MODEL = getCollectionModel(collection);
  const SEARCH_REGEX = searchParams
    ? new RegExp(searchParams, "i")
    : searchParams;
  const fields = SEARCH_FIELDS[collection];
  const SEARCH_CRITERIA = fields.map((field) => ({
    [field]: SEARCH_REGEX,
  }));
  return { SEARCH_CRITERIA, MODEL };
}
async function searchInCollection(searchParams, collection, _id) {
  const { SEARCH_CRITERIA, MODEL } = setSearchFields(collection, searchParams);
  return await MODEL.find({
    _id: { $ne: _id },
    $or: SEARCH_CRITERIA,
  })
    .limit(10)
    .select("-__v -refreshToken -password");
}

async function searchSingleData(searchParams, collection, _id) {
  const { SEARCH_CRITERIA, MODEL } = setSearchFields(collection, searchParams);
  const SEARCH_CONDITION = !searchParams
    ? {
        _id: { $ne: _id },
      }
    : {
        _id: { $ne: _id },
        $or: SEARCH_CRITERIA,
      };
  return await MODEL.find(SEARCH_CONDITION).select(
    "-__v -refreshToken -password -token",
  );
}

export { searchInCollection, searchSingleData, getCollectionModel };
