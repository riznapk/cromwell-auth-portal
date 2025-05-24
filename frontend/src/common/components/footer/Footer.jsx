import { Box, Grid, Link, Typography } from "@mui/material";
import logo from "../../../assets/images/logo.svg";
import Banner from "./Banner";

function Footer() {
  return (
    <>
      <Banner />
      <Grid container spacing={3} sx={styles.container}>
        <Grid item xs={12} md={5}>
          <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
        </Grid>

        {/* Links section on the right, using flex for inline items */}
        <Grid item xs={12} md={7}>
          <Box
            display="flex"
            justifyContent="space-between"
            gap={4}
            sx={styles.footerLinkColumn}
          >
            <Box sx={styles.mainFooterSection}>
              <Typography
                component={Link}
                to="/about"
                sx={styles.mainFooterLink}
              >
                About
              </Typography>
              <Typography
                component={Link}
                to="/about"
                sx={styles.subFooterLink}
              >
                About Us
              </Typography>
              <Typography
                component={Link}
                to="/about"
                sx={styles.subFooterLink}
              >
                Why Cromwell
              </Typography>
              <Typography
                component={Link}
                to="/about"
                sx={styles.subFooterLink}
              >
                Careers
              </Typography>
            </Box>

            <Box sx={styles.mainFooterSection}>
              <Typography
                component={Link}
                to="/help"
                sx={styles.mainFooterLink}
              >
                Help
              </Typography>
              <Typography
                component={Link}
                to="/contact"
                sx={styles.subFooterLink}
              >
                Contact Us
              </Typography>
              <Typography
                component={Link}
                to="/returns"
                sx={styles.subFooterLink}
              >
                Returns
              </Typography>
              <Typography
                component={Link}
                to="/deliveries"
                sx={styles.subFooterLink}
              >
                Our Deliveries
              </Typography>
              <Typography
                component={Link}
                to="/customer-services"
                sx={styles.subFooterLink}
              >
                Customer Services
              </Typography>
            </Box>

            <Box sx={styles.mainFooterSection}>
              <Typography
                component={Link}
                to="/key-info"
                sx={styles.mainFooterLink}
              >
                Key Information
              </Typography>
              <Typography
                component={Link}
                to="/terms"
                sx={styles.subFooterLink}
              >
                Terms and Conditions
              </Typography>
              <Typography
                component={Link}
                to="/privacy"
                sx={styles.subFooterLink}
              >
                Privacy and Cookies
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={styles.copyright}>
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
    height: "250px",
    width: "250px",
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
