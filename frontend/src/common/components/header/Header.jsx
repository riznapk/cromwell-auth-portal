import { Box, Grid, Link, Typography } from "@mui/material";
import logo from "../../../assets/images/logo.svg";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

function Header() {
  return (
    <Grid conatiner sx={styles.conatiner}>
      <Grid item>
        <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
      </Grid>
      <Grid item>
        {/* <Avatar sx={styles.avatar}>H</Avatar> */}
        <Box component={Link} to="/login" sx={styles.avatarContainer}>
          <Avatar>
            <PersonIcon />
          </Avatar>
          <Typography>Login / Register</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

const styles = {
  logo: {
    objectFit: "contain",
    height: "40px",
  },
  conatiner: {
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
    gap: "10px",
    cursor: "pointer",
    color: "primary.main",
  },
};

export default Header;
