import appModel from "../models/application_model.js";
import userModel from "../models/user_model.js";
const createApp = async (req, resp) => {
  try {
    const { _id, role } = req.user;
    const { appIcon, appName, appDesc, appUrl } = req.body;
    const isAppNameAvavilable = await appModel.findOne({ appName });
    if (isAppNameAvavilable) {
      return resp.status(200).json({
        message: `App name already exists. Please try with different name`,
      });
    }
    const user = await userModel.findById({ _id });
    if (role === "SUPER_ADMIN") {
      const app = await appModel.create({
        appIcon,
        appName,
        appDesc,
        appUrl,
        workspace: user.workspace,
      });
      console.log("application", app);
      
      return resp
        .status(201)
        .json({ message: `${app.appName} Created Successfully` });
    } else {
      return resp
        .status(401)
        .json({ message: "Please contact your administrator" });
    }
  } catch (error) {
    return resp.status(201).json({ message: error?.message });
  }
};

export default createApp;
