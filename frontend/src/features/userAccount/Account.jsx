import React from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BasicTabs from "../../common/components/BasicTabs";
import { Link } from "react-router-dom";

const tabContent = ["Account Overview", "Purchases", "Profile", "Need Help"];

function Account() {
  const user = useSelector((state) => state.auth.user);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      direction={isSmallScreen ? "column" : "row"}
      sx={styles.container}
    >
      <Grid
        item
        xs={12}
        sm={4}
        md={3}
        sx={{
          ...styles.sidebar,
          borderRight: isSmallScreen ? "none" : styles.sidebar.borderRight,
          borderBottom: isSmallScreen ? styles.sidebar.borderBottom : "none",
        }}
      >
        <Box sx={styles.userInfoBox}>
          <PersonOutlineIcon sx={styles.userIcon} />
          <Box sx={styles.userDetailsBox}>
            <Typography>{`${user?.firstName} ${user?.lastName}`}</Typography>
            <Box component={Link} sx={styles.logoutText}>
              Logout
            </Box>
          </Box>
        </Box>

        <BasicTabs
          value={value}
          handleChange={handleChange}
          isVertical={!isSmallScreen}
        />
      </Grid>

      <Grid item xs={12} sm={8} md={9} sx={styles.contentBox}>
        <Box>
          <Typography variant="h6">{tabContent[value]}</Typography>
          <Box mt={2}>
            <Typography>
              This is the content for &quot;{tabContent[value]}&quot;
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
  },
  sidebar: {
    borderRight: "2px solid rgb(245, 245, 245)",
    borderBottom: "2px solid rgb(245, 245, 245)",
  },
  userInfoBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    padding: 2,
    borderBottom: "2px solid rgb(245, 245, 245)",
  },
  userIcon: {
    fontSize: 50,
    color: "primary.main",
  },
  contentBox: {
    padding: 3,
  },
  logoutText: {
    display: "block",
    fontSize: "0.875rem",
    color: "primary.main",
    cursor: "pointer",
    mt: 0.5,
  },
  userDetailsBox: {
    display: "flex",
    flexDirection: "column",
  },
};

export default Account;
