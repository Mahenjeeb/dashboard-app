import {searchInCollection, searchSingleData} from "../../utils/search-helper.js";

const getSearchSuggestions = async (req, resp) => {
  const { searchParams, collection } = req.query;
  const { _id } = req.user;
  if (!searchParams || !collection) resp.status(200).send([]);
  try {
    const data = await searchInCollection(searchParams, collection, _id);
    return resp.status(200).send(data);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

const searchData = async (req, resp) => {
  const { searchParams, collection } = req.query;
  const { _id } = req.user;
  try {
    const data = await searchSingleData(searchParams, collection, _id);
    return resp.status(200).send(data);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export { getSearchSuggestions, searchData };
