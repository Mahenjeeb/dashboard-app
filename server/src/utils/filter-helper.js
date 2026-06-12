import { getCollectionModel } from "./search-helper.js";
import dateFormatPipeline from "./format-date.js";
const COLUMNS_TO_FILTER = {
  users: ["role", "status"],
  invitations: ["roleForUser", "accepted"],
};
const filterColumns = async (collection) => {
  const model = getCollectionModel(collection);
  const groupFields = COLUMNS_TO_FILTER[collection].reduce((acc, field) => {
    acc[field] = {
      $addToSet: `$${field}`,
    };
    return acc;
  }, {});

  const distinctMany = [
    {
      $group: {
        _id: null,
        ...groupFields,
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ];
  return await model.aggregate([...distinctMany]);
};
const filterOnCollection = async (collection, filters = [], _id) => {
  const model = getCollectionModel(collection);
  const allowedFields = COLUMNS_TO_FILTER[collection] ?? [];
  const condition = filters.reduce((query, filter) => {
    if (!allowedFields.includes(filter.field)) {
      throw new Error(`Invalid filter field: ${filter.field}`);
    }
    if (filter.operator !== "in") {
      throw new Error(`Invalid filter operator: ${filter.operator}`);
    }
    if (!Array.isArray(filter.values)) {
      throw new Error(`Filter values must be an array: ${filter.field}`);
    }
    query[filter.field] = { $in: filter.values };
    return query;
  }, {});
  // return await model.find({ _id: { $ne: _id }, ...condition }).select("__v -refreshTokens -password");
  return await model.aggregate([
    { $match: { _id: { $ne: _id }, ...condition } },
    ...dateFormatPipeline,
  ])
};

export { filterColumns, filterOnCollection };
