import phoneIcon from "../../assets/icons/phone.svg";
import writeIcon from "../../assets/icons/write.svg";
import shippingIcon from "../../assets/icons/shipping.svg";
import returnGoodsIcon from "../../assets/icons/return-goods.svg";

import "./topbar.less";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar__row">
        <a className="topbar__item" href="tel:+48000000000">
          <img className="topbar__item-icon" src={phoneIcon} alt="phone icon" />
          +48 000 000 000
        </a>
        <span className="topbar__separator">|</span>
        <a className="topbar__item" href="mailto:sklep@unlimitech.pl">
          <img className="topbar__item-icon" src={writeIcon} alt="mail icon" />
          Napisz do nas
        </a>
        <span className="topbar__separator">|</span>
        <a className="topbar__item" href="#">
          <img
            className="topbar__item-icon"
            src={shippingIcon}
            alt="shipping icon"
          />
          Darmowa dostawa
        </a>
        <span className="topbar__separator">|</span>
        <a className="topbar__item" href="#">
          <img
            className="topbar__item-icon"
            src={returnGoodsIcon}
            alt="return goods icon"
          />
          30 dni na darmowy zwrot
        </a>
      </div>
    </div>
  );
}
