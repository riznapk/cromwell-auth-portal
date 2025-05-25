import { Paper, Typography, Link, Box } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Link as RouterLink } from "react-router-dom";

function CustomBanner({
  bgImage,
  bgColor = "primary.main",
  text = "Welcome to Cromwell",
  textColor = "#FFFFFF",
  subText = "",
  bannerLink = "/",
}) {
  const style = styles({ bgImage, bgColor, textColor });
  return (
    <Link
      component={RouterLink}
      to={bannerLink}
      underline="none"
      sx={style.bannerLink}
    >
      <Paper sx={style.paper}>
        <Box>
          <Typography variant="h5" sx={style.Typography}>
            {text}
          </Typography>
          <Typography variant="h6" sx={style.subText} className="subText">
            {subText}
          </Typography>
        </Box>

        <ArrowForwardIosSharpIcon sx={style.icon} />
      </Paper>
    </Link>
  );
}

const styles = ({ bgImage, bgColor, textColor }) => ({
  paper: {
    // width: "450px",
    padding: 2,
    display: "flex",
    flexDirection: "column",
    minHeight: "250px",
    justifyContent: "space-between",
    backgroundColor: bgColor,
    backgroundImage: bgImage ? `url(${bgImage})` : "none",
    backgroundSize: "cover",
    // backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  Typography: { textAlign: "left", color: textColor },
  subText: {
    display: "none",
    color: textColor,
    textAlign: "left",
  },
  button: { alignSelf: "flex-end" },
  icon: {
    alignSelf: "flex-end",
    color: textColor,
  },
  bannerLink: {
    "&:hover > .MuiPaper-root": {
      backgroundImage: "none",
      backgroundColor: "primary.main",
    },
    "&:hover > .MuiPaper-root .subText": {
      display: "block",
    },
  },
});

export default CustomBanner;
