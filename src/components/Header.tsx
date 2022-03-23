import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import { FC } from "react";
interface HeaderProps {
  dark: {
    backgroundColor: string;
    color: string;
  };
  darkBtn: {
    backgroundColor: string;
    color: string;
    "&:hover": {
      background: string;
      color: string;
    };
  };
  darkMode: boolean;
  changeDarkMode: () => void;
}
const Header: FC<HeaderProps> = ({
  dark,
  darkMode,
  darkBtn,
  changeDarkMode,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        height: 90,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 10,
        ...(darkMode && dark),
      }}
    >
      <Typography variant="h4" component="div" pl={10}>
        Where in the world?
      </Typography>
      <Stack pr={10}>
        <IconButton
          aria-label="delete"
          size="large"
          sx={{
            "&:hover": {
              background: "none",
              color: "black",
            },
            ...(darkMode && dark),
            ...(darkMode && darkBtn),
          }}
          onClick={changeDarkMode}
        >
          <Brightness3Icon fontSize="inherit" />
          Dark Mode
        </IconButton>
      </Stack>
    </Paper>
  );
};
export default Header;
