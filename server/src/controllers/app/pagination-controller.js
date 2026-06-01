import paginationOnCollections from "../../utils/pagination-helper.js";

const getPagination = async (req, resp) => {
  const { page, limit, collection } = req.query;
  const pageNumber = parseInt(page, 10) || 1;
  const limitData = parseInt(limit, 10) || 10;
  const { pageData, totalItems, totalPages } = await paginationOnCollections(
    pageNumber,
    collection,
    limit,
  );
  return resp
    .status(200)
    .json({ totalItems, pageNumber, totalPages, pageData });
};

export default getPagination