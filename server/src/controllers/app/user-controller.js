import USERS from "../../models/user_model.js";
const getUsers = async (_, resp) => {
  try {
    const users = await USERS.find({});
    return resp.status(200).send(users);
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};

export { getUsers };
