import { Box, Grid, Typography } from "@mui/material";
import CustomBanner from "../../common/components/CustomBanner";
import toolguide from "../../assets/images/toolguide.png";
import service from "../../assets/images/service.png";
import delivery from "../../assets/images/delivery.png";
import { useEffect } from "react";
import api from "../../api/apiConfig";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails } from "../auth/slices/authSlice";

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  //fetching user details on load
  const fetchUserDetails = async () => {
    try {
      if (!user) {
        const response = await api.get("/user/info", {
          withCredentials: true,
        });
        dispatch(addUserDetails(response.data.user));
        console.log("User details fetched successfully:", response.data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user]);

  return (
    <>
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h5">
          Hello {user?.firstName}, Let’s get you the right tools for the job.
        </Typography>
      </Box>
      <Grid
        container
        justifyContent="space-around"
        alignItems="stretch"
        spacing={2}
        sx={{
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
    </>
  );
}

export default Home;
