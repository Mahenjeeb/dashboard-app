import { getCollectionModel } from "./search-helper.js";
const COLUMNS_TO_FILTER = {
  users: ["role", "status"],
  invitations: ["roleForUser", "accepted"],
};
async function filterColumns(collection) {
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

  // const [result = {}] = await model.aggregate([...distinctMany]); 
  // return Object.entries(result).map(([field, values]) => ({
  //     category: field,
  //     values,
  //   }));
  return await model.aggregate([...distinctMany]);
}

export default filterColumns;
