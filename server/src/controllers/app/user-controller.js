import USERS from "../../models/user_model.js";
import userroles from "../../models/user_role_model.js";
const getUsers = async (req, resp) => {
  const { _id } = req.user;
  try {
    const users = await USERS.find({ _id: { $ne: _id } });
    return resp.status(200).send(users);
  } catch (error) {
    return resp.status(500).json(error.message);
  }
};
const editUser = async (req, resp) => {
  const { id, email, roleForUser } = req.body;
  try {
    const updateUser = await USERS.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          email,
          role: roleForUser,
        },
      },
    );
    if (!updateUser) return resp.status(401).json({ message: "BAD REQUEST" });
    return resp.status(200).json({ message: "updated sucessfully" });
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
const deleteUser = async (req, resp) => {
  const { id } = req.body;
  try {
    const deleteUserById = await USERS.findByIdAndDelete({ _id: id });
    if (!deleteUserById)
      return resp.status(401).json({ message: "BAD REQUEST" });
    return resp.status(200).json({ message: "Deleted Sucessfully" });
  } catch (error) {
    return resp.status(500).json({ message: error.message });
  }
};
const getRoles = async (_, resp) => {
  try {
    const roles = await userroles.find({});
    return resp.status(200).send(roles);
  } catch (error) {
    return resp.status(500).send(error.message);
  }
};
export { getUsers, getRoles, editUser, deleteUser };
