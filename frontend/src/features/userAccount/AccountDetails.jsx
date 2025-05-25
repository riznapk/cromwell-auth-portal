import { Button, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import InputField from "../../common/components/InputField";

function AccountDetails() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Grid>
      <Typography>First Name: {user?.firstName}</Typography>
      <Typography>Last Name: {user?.lastName}</Typography>
      <Typography>Email: {user?.email}</Typography>
    </Grid>
  );
}

export default AccountDetails;
