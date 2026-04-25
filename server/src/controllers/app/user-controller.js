import USERS from "../../models/user_model.js";
import userroles from "../../models/user_role_model.js";
const getUsers = async (_, resp) => {
  try {
    const users = await USERS.find({});
    return resp.status(200).send(users);
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};

const getRoles = async (_, resp) => {
  try {
    const roles = await userroles.find({});
    return resp.status(200).send(roles);
  } catch (error) {
    return resp.status(500).send(error.message);
  }
}
export { getUsers, getRoles };
