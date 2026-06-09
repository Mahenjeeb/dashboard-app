import filterColumns from "../../utils/filter-helper.js";

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

export { getFilters };
