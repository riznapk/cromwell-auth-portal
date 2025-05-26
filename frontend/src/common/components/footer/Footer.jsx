import { Box, Grid, Typography } from "@mui/material";
import logo from "../../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import Banner from "./Banner";

function Footer() {
  return (
    <>
      <Banner />
      <Grid container spacing={3} sx={styles.container}>
        <Grid component={Link} to="/" size={{ xs: 12, md: 5 }}>
          <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
        </Grid>

        {/* Links section on the right, using flex for inline items */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            gap={4}
            sx={styles.footerLinkColumn}
          >
            <Box sx={styles.mainFooterSection}>
              <Typography component={Link} to="/wip" sx={styles.mainFooterLink}>
                About
              </Typography>
              <Typography component={Link} to="/wip" sx={styles.subFooterLink}>
                About Us
              </Typography>
              <Typography component={Link} to="/wip" sx={styles.subFooterLink}>
                Why Cromwell
              </Typography>
              <Typography component={Link} to="/wip" sx={styles.subFooterLink}>
                Careers
              </Typography>
            </Box>

            <Box sx={styles.mainFooterSection}>
              <Typography component={Link} to="/wip" sx={styles.mainFooterLink}>
                Help
              </Typography>
              <Typography component={Link} to="/wip" sx={styles.subFooterLink}>
                Contact Us
              </Typography>
              <Typography component={Link} to="/wip" sx={styles.subFooterLink}>
                Returns
              </Typography>
              <Typography component={Link} to="/wip" sx={styles.subFooterLink}>
                Our Deliveries
              </Typography>
              <Typography component={Link} to="/wip" sx={styles.subFooterLink}>
                Customer Services
              </Typography>
            </Box>

            <Box sx={styles.mainFooterSection}>
              <Typography component={Link} to="/wip" sx={styles.mainFooterLink}>
                Key Information
              </Typography>
              <Typography component={Link} to="/wip" sx={styles.subFooterLink}>
                Terms and Conditions
              </Typography>
              <Typography component={Link} to="/wip" sx={styles.subFooterLink}>
                Privacy and Cookies
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid sx={styles.copyright}>
        <Typography>© 2023 Cromwell. All rights reserved.</Typography>
      </Grid>
    </>
  );
}

const styles = {
  container: {
    p: 2,
    borderTop: "2px solid #D8DFE1",
  },
  logo: {
    height: "auto",
    width: "250px",
    alignSelf: "flex-start",
  },
  mainFooterLink: {
    textDecoration: "none",
    color: "primary.main",
    display: "block",
    mb: 1,
    fontSize: "14px",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  subFooterLink: {
    textDecoration: "none",
    color: "text.secondary",
    display: "block",
    mb: 1,

    fontSize: "14px",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  mainFooterSection: {
    flex: 1,
  },
  copyright: {
    color: "#758592",
    height: "40px",
    fontSize: "14px",
    textAlign: "left",
    p: 2,
    py: 2,
    backgroundColor: "rgb(242, 242, 242)",
    borderTop: "2px solid #D8DFE1",
  },
  footerLinkColumn: {
    display: "flex",
    flexDirection: "row",

    gap: 4,
    flexWrap: "wrap",
  },
};

export default Footer;
