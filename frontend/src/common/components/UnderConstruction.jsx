import { Box, Typography, Button } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useNavigate } from "react-router-dom";

function UnderConstruction() {
  const navigate = useNavigate();
  return (
    <Box sx={styles.wrapper}>
      <ConstructionIcon sx={styles.icon} />
      <Typography variant="h4" sx={styles.heading}>
        Page Under Construction
      </Typography>
      <Typography variant="body1" sx={styles.subtext}>
        We're working hard to bring you this page. Please check back soon!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          navigate("/");
        }}
        sx={styles.button}
      >
        Back to Home
      </Button>
    </Box>
  );
}

const styles = {
  wrapper: {
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    px: 2,
    bgcolor: "#f5f5f5",
  },
  icon: {
    fontSize: 80,
    color: "primary.main",
    mb: 2,
  },
  heading: {
    mb: 1,
  },
  subtext: {
    mb: 3,
    maxWidth: 400,
  },
  button: {
    textTransform: "none",
  },
};

export default UnderConstruction;
