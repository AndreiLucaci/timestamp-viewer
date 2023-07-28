import * as React from "react";
import Typography from "@mui/material/Typography";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <Typography variant="h3" component="div" gutterBottom>
        Timestamper - UNIX timestamp viewer
      </Typography>
    </header>
  );
}
