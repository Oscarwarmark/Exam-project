import { IconButton } from "@mui/material";
import "../styles/Footer.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
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
