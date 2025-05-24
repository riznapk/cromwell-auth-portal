import { Typography, Container, Grid } from "@mui/material";
import CustomBanner from "../../common/components/CustomBanner";

function Home() {
  return (
    <Grid Container sx={{ display: "flex" }} spacing={2}>
      <CustomBanner />
    </Grid>
  );
}

export default Home;
