import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ value, handleChange, isVertical }) {
  return (
    <Tabs
      orientation={isVertical ? "vertical" : "horizontal"}
      variant={isVertical ? "scrollable" : "fullWidth"}
      value={value}
      onChange={handleChange}
      aria-label="account tabs"
      sx={isVertical ? styles.tabsVertical : styles.tabsHorizontal}
    >
      <Tab label="Account Overview" {...a11yProps(0)} />
      <Tab label="Purchases" {...a11yProps(1)} />
      <Tab label="Profile" {...a11yProps(2)} />
      <Tab label="Need Help" {...a11yProps(3)} />
    </Tabs>
  );
}

BasicTabs.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  isVertical: PropTypes.bool,
};

const styles = {
  tabsVertical: {
    width: "100%",
  },
  tabsHorizontal: {
    width: "100%",
  },
};
