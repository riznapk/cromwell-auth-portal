import { Paper, Typography, Button } from "@mui/material";

function CustomBanner({
  bgImage,
  bgColor = "primary.main",
  borderColor = "#D8DFE1",
  text = "Welcome to Cromwell",
  buttonText = "Shop Now",
  onButtonClick = () => {},
}) {
  return (
    <Paper sx={styles({ bgImage, bgColor, borderColor })}>
      <Typography variant="h4" sx={styles.Typography}>
        Welcome to Cromwell
      </Typography>
      <Button variant="contained" color="secondary" sx={styles.button}>
        Shop Now
      </Button>
    </Paper>
  );
}

const styles = ({ bgImage, bgColor, borderColor }) => ({
  paper: {
    padding: 2,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "200px",
    backgroundColor: bgColor,
    backgroundImage: bgImage ? `url(${bgImage})` : "none",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  Typography: { textAlign: "left" },
  button: { alignSelf: "flex-end" },
});

export default CustomBanner;
