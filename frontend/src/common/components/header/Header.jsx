import { Box, Grid, Typography } from "@mui/material";
import logo from "../../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import CallIcon from "@mui/icons-material/Call";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Grid container sx={styles.container}>
      <Grid component={Link} to="/">
        <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
      </Grid>

      <Grid>
        {!isUserLoggedIn ? (
          <Box component={Link} to="/login" sx={styles.avatarContainer}>
            <Avatar>
              <PersonIcon />
            </Avatar>
            <Typography>Login / Register</Typography>
          </Box>
        ) : (
          <Box component={Link} to="/my-account" sx={styles.avatarContainer}>
            <Avatar sx={styles.avatar}>
              {user?.firstName?.charAt(0).toUpperCase() +
                user?.lastName?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography>My Account</Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

const styles = {
  logo: {
    objectFit: "contain",
    height: "40px",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",

    backgroundColor: "rgb(242, 242, 242)",
  },
  avatar: { bgcolor: "primary.main" },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    cursor: "pointer",
    color: "primary.main",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    },
  },
  headerOptions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  },
};

export default Header;
