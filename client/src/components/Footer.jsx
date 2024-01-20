import { IconButton } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import "../styles/Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  const location = useLocation();

  // Check if the current route is the admin page
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
    // If it's the admin page, don't render the header
    return null;
  }
  return (
    <div className="footer-container">
      <div>FOLLOW</div>
      <div>
        <IconButton>
          <InstagramIcon />
        </IconButton>
        <IconButton>
          <FacebookIcon />
        </IconButton>
        <IconButton>
          <YouTubeIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Footer;
