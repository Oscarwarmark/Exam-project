import { useLocation } from "react-router-dom";
import "../styles/Footer.css";

// mui
import { IconButton } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Only renders on pages that dont start with "/admin"

function Footer() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage) {
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
