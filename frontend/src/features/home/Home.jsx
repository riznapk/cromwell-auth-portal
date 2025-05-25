import { Grid } from "@mui/material";
import CustomBanner from "../../common/components/CustomBanner";
import toolguide from "../../assets/images/toolguide.png";
import service from "../../assets/images/service.png";
import delivery from "../../assets/images/delivery.png";

function Home() {
  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="stretch"
      spacing={2}
      sx={{
        // display: "flex",
        // flexDirection: "row",
        margin: 2,
      }}
    >
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CustomBanner
          bgImage={toolguide}
          text="Free tooling guide"
          subText="Latest tooling news and products."
          bannerLink="/wip"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CustomBanner
          bgImage={service}
          text="Customer Stories"
          subText="For free delivery and even better prices."
          bannerLink="/wip"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CustomBanner
          bgImage={delivery}
          text="Fast, flexible delivery"
          subText="98% next day, 85% by our own drivers."
          bannerLink="/wip"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <CustomBanner
          bgColor="#1C355E"
          text="All sevices"
          subText="Find out more."
          bannerLink="/wip"
        />
      </Grid>
    </Grid>
  );
}

export default Home;
