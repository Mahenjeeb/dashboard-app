import toast from "react-hot-toast";

export const getErrorMessage = (
  error,
  fallbackMessage = "Something went wrong. Please try again.",
) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallbackMessage;

export const notifySuccess = (message) => {
  toast.success(message);
};

export const notifyError = (error, fallbackMessage) => {
  toast.error(getErrorMessage(error, fallbackMessage));
};
