import Workspace from "../models/workspace_model.js";
import userModel from "../models/user_model.js";
const createWorkspace = async (req, resp) => {
  try {
    const { _id, role } = req.user;
    const { workspace_name, workspace_desc } = req.body;
    if (role === "SUPER_ADMIN") {
      const workspace = await Workspace.create({
        workspace_name,
        workspace_desc,
        ownerId: _id,
      });
      const user = await userModel.findById({ _id });
      user.workspace = workspace._id;
      await user.save();
      console.log("work", workspace);
      
      return resp
        .status(201)
        .json({ message: `${workspace.workspace_name} Created` });
    }
  } catch (error) {
    return resp.status(500).json({ message: error?.message });
  }
};

export default createWorkspace;
