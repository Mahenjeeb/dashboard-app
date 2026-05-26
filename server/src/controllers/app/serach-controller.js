import USERS from "../../models/user_model.js";
import INVITATIONS from "../../models/invitation-model.js";

const getSearchSuggestionsForUser = async (req, resp) => {
  const { query } = req.body;
  const { _id } = req.user;
  if (!query) resp.status(200).send([]);
  try {
    const serachSuggestionUser = await USERS.find({
      _id: { $ne: _id },
      $or: [{ email: { $regex: query, $options: "i" } }],
    });
    return resp.status(200).send(serachSuggestionUser);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

const searchUsers = async (req, resp) => {
  const { query } = req.query;
  const { _id } = req.user;
  const searchCriteria = query
    ? { _id: { $ne: _id }, email: query }
    : { _id: { $ne: _id } };
  try {
    const searchData = await USERS.find(searchCriteria);
    return resp.status(200).send(searchData);
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};

export { getSearchSuggestionsForUser, searchUsers };
