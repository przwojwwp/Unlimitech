import Facebook from "@assets/icons/facebook.svg?react";
import Instagram from "@assets/icons/instagram.svg?react";
import Tictok from "@assets/icons/tik-tok.svg?react";
import "./socials.less";

export const Socials = () => {
  return (
    <div className="footer__social col-sm-4 col-md-3">
      <h4 className="footer__subheading">Social media</h4>
      <ul className="footer__social-list">
        <li>
          <a href="#" aria-label="Facebook">
            <Facebook className="footer__social-link" />
          </a>
        </li>
        <li>
          <a href="#" aria-label="Instagram">
            <Instagram className="footer__social-link" />
          </a>
        </li>
        <li>
          <a href="#" aria-label="TikTok">
            <Tictok className="footer__social-link" />
          </a>
        </li>
      </ul>
    </div>
  );
};
