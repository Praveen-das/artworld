import "./footer.css";
import Instagram from "../../../Assets/Icons/instagram.svg?react";
import Facebook from "../../../Assets/Icons/facebook.svg?react";
import Twitter from "../../../Assets/Icons/twitter.svg?react";
import { Box } from "@mui/material";
import Card from "../../Ui/Card";
import { hidden, spacing } from "../../../const";

function Footer() {
  return (
    <Box
      sx={{
        px: { ...spacing, xs: 0 },
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 14 },
          pt: { xs: 4, md: 8 },
          mt: "var(--vSpacing)",
          height: "fit-content",
          bgcolor: "primary.main",
          color: "white",
          borderTopLeftRadius: { md: 20 },
          borderTopRightRadius: { md: 20 },
        }}
      >
        <div className="footer-container">
          <div className="list">
            <ul>
              About Us
              <li>Oil paintings</li>
              <li>Acryplic paintings</li>
              <li>Watercolor paintings</li>
              <li>Illustrations</li>
              <li>Mural paintings</li>
              <li>Digital arts</li>
            </ul>
            <Box component="ul" sx={hidden.sm}>
              SELL
              <li>Oil paintings</li>
              <li>Acryplic paintings</li>
              <li>Watercolor paintings</li>
              <li>Illustrations</li>
              <li>Mural paintings</li>
              <li>Digital arts</li>
            </Box>
          </div>
          <div className="contact">
            <ul>
              Contact Us
              <li>artworld@gmail.com</li>
              <li>+1-202-555-0125</li>
              <li>
                <div className="follow">
                  <Instagram style={{ width: "30px", height: "30px" }} />
                  <Facebook style={{ width: "30px", height: "30px" }} />
                  <Twitter style={{ width: "30px", height: "30px" }} />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer2">
          <p>Privacy Policy</p>
          <p>Site map</p>
          <p>© 2021 Picasso.com</p>
        </div>
      </Box>
    </Box>
  );
}

export default Footer;
