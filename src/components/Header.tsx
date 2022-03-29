import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import IconButton from "@mui/material/IconButton";
import { FC } from "react";
import Grid from "@mui/material/Grid";
interface HeaderProps {
  changeDarkMode: () => void;
}
const Header: FC<HeaderProps> = ({ changeDarkMode }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        pt: 3,
        pb: 3,
        width: "100%",
        mb: 10,
        backgroundColor: "var(--secondary-bg)",
        color: "var(--primary-text)",
      }}
    >
      <Grid container justifyContent="space-around" alignItems="center">
        <Grid item lg={8}>
          <Link
            to={`/`}
            style={{ textDecoration: "none", color: "var(--primary-text)" }}
          >
            <Typography variant="h4">Where in the world?</Typography>
          </Link>
        </Grid>
        <Grid item lg={1}>
          <IconButton
            aria-label="delete"
            size="medium"
            sx={{
              color: "var(--primary-text)",
              "&:hover": {
                background: "none",
                color: "var(--primary-text)",
              },
              "&:visited": {
                background: "none",
                border: "none",
                borderRadius: "none",
              },
            }}
            onClick={changeDarkMode}
          >
            <NightlightRoundIcon fontSize="inherit" />
            Dark Mode
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default Header;
