import TextField from "@mui/material/TextField";
import { alpha } from "@mui/material/styles";

const AppTextField = ({ sx, ...props }) => {
  return (
    <TextField
      {...props}
      sx={[
        (theme) => {
          return {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#FFFFFF",
              color: "#0F172A",
              "& fieldset": {
                borderColor: alpha(theme.palette.common.black, 0.65),
              },
              "&:hover fieldset": {
                borderColor: alpha(theme.palette.common.black, 0.85),
              },
              "&.Mui-focused fieldset": {
                borderColor: alpha(theme.palette.common.black, 0.95),
              },
              "& .MuiInputBase-input": {
                color: "#0F172A",
                "&::placeholder": {
                  color: alpha(theme.palette.common.black, 0.48),
                  opacity: 1,
                },
              },
              "& .MuiSvgIcon-root": {
                color: alpha(theme.palette.common.black, 0.78),
              },
            },
            "& .MuiInputLabel-root": {
              color: alpha(theme.palette.common.black, 0.7),
              "&.Mui-focused": {
                color: alpha(theme.palette.common.black, 0.88),
              },
            },
            "& .MuiFormHelperText-root": {
              marginTop: 4,
              marginLeft: 0,
            },
          };
        },
        sx,
      ]}
    />
  );
};

export default AppTextField;
