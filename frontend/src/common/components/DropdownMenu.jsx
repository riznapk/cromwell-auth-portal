import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

export default function DropdownMenu({
  label = "Menu",
  items = [],
  onItemClick = () => {},
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item) => {
    onItemClick(item);
    handleMenuClose();
  };

  return (
    <>
      <Button
        id="menu-button"
        aria-controls={open ? "menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleMenuOpen}
        variant="contained"
      >
        {label}
      </Button>

      <Menu id="menu" anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        {items.map((item) => (
          <MenuItem key={item.label} onClick={() => handleItemClick(item)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
