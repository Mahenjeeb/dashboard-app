import Button from "@mui/material/Button";
import { alpha } from "@mui/material/styles";

const resolvePalette = (theme, color) => {
  if (color && theme.palette[color]) {
    return theme.palette[color];
  }
  return theme.palette.primary;
};

const AppButton = ({
  variant = "contained",
  color = "primary",
  disableElevation = true,
  sx,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      disableElevation={disableElevation}
      sx={[
        (theme) => {
          const palette = resolvePalette(theme, color);

          if (variant === "outlined") {
            return {
              color: palette.main,
              borderColor: palette.main,
              borderWidth: 1,
              "&:hover": {
                borderColor: palette.dark,
                backgroundColor: alpha(palette.main, 0.06),
              },
            };
          }

          if (variant === "text") {
            return {
              color: palette.main,
              "&:hover": {
                backgroundColor: alpha(palette.main, 0.08),
              },
            };
          }

          return {
            backgroundColor: palette.main,
            color: palette.contrastText,
            "&:hover": {
              backgroundColor: palette.dark,
            },
          };
        },
        {
          justifyContent: "center",
          whiteSpace: "nowrap",
          lineHeight: 1.2,
        },
        sx,
      ]}
      {...props}
    />
  );
};

export default AppButton;
