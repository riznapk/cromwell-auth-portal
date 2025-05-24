import { Box, Grid } from "@mui/material";
import catalogue from "../../../assets/images/catalogue.png";
import helpBanner from "../../../assets/images/help-and-support.png";

function Banner() {
  return (
    <Grid container sx={styles.container}>
      <Grid item sm={12} md={6}>
        {
          /* <img src={helpBanner} alt="help and support" sx={styles.image} /> */
          <Box
            component="img"
            src={helpBanner}
            alt="Help and Support"
            sx={styles.image}
          />
        }
      </Grid>
      <Grid item sm={12} md={6}>
        <Box
          component="img"
          src={catalogue}
          alt="Request a Catalogue"
          sx={styles.image}
        />
      </Grid>
    </Grid>
  );
}

const styles = {
  container: {
    margin: 0,
    p: 0,
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
    objectFit: "contain",
  },
};

export default Banner;
