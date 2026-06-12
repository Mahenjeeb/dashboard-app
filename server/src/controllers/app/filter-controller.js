import {
  filterColumns,
  filterOnCollection,
} from "../../utils/filter-helper.js";
import { getCollectionModel } from "../../utils/search-helper.js";

const getFilters = async (req, resp) => {
  const { collection } = req.query;
  if (!collection) return;
  try {
    const filterData = await filterColumns(collection);
    return resp.status(200).send(filterData[0]);
  } catch (error) {
    return resp.status(400).send(error.message);
  }
};

const applyFilters = async (req, resp) => {
  const { filters } = req.body;
  const { collection } = req.query;
  const { _id } = req.user;
  try {
    if (!filters || !collection) return;
    const data = await filterOnCollection(collection, filters, _id);
    return resp.status(200).send(data);
  } catch (error) {
    return resp.status(400).send(error.message);
  }
};

export { getFilters, applyFilters };
