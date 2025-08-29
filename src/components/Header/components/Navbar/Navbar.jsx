import "./navbar.less";
import searchIcon from "@assets/icons/search.svg";
import favouritesIcon from "@assets/icons/favourites.svg";
import userIcon from "@assets/icons/user.svg";
import cartIcon from "@assets/icons/cart.svg";
import unlimitechLogo from "@assets/icons/unlimitech-logo.svg";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__row">
          <div className="navbar__logo">
            <img
              className="navbar__logo-img"
              src={unlimitechLogo}
              alt="Unlimitech Logo"
            />
          </div>

          <nav className="navbar__menu" aria-label="Główne">
            <ul className="navbar__menu-list">
              <li className="navbar__menu-item">
                <a className="navbar__menu-link" href="#">
                  Damskie buty skórzane
                </a>
              </li>
              <li className="navbar__menu-item">
                <a className="navbar__menu-link" href="#">
                  Bony podarunkowe
                </a>
              </li>
              <li className="navbar__menu-item">
                <a className="navbar__menu-link" href="#">
                  Nowości
                </a>
              </li>
              <li className="navbar__menu-item">
                <a className="navbar__menu-link" href="#">
                  Bestsellery
                </a>
              </li>
              <li className="navbar__menu-item navbar__menu-item--highlight">
                <a className="navbar__menu-link" href="#">
                  Wyprzedaż
                </a>
              </li>
            </ul>
          </nav>

          <div className="navbar__actions">
            <div className="navbar__search">
              <button className="navbar__search-btn" aria-label="Szukaj">
                <img
                  className="navbar__search-icon"
                  src={searchIcon}
                  alt="Search Icon"
                  aria-hidden="true"
                />
              </button>
              <input
                className="navbar__search-input"
                type="text"
                placeholder="Wyszukaj"
                aria-label="Szukaj"
              />
            </div>

            <div className="navbar__icons">
              <span className="navbar__icon-wrapper">
                <button className="navbar__icon-btn" aria-label="Ulubione">
                  <img
                    className="navbar__icon"
                    src={favouritesIcon}
                    alt="Favourites Icon"
                  />
                </button>
              </span>
              <span className="navbar__icon-wrapper">
                <button className="navbar__icon-btn" aria-label="Konto">
                  <img
                    className="navbar__icon"
                    src={userIcon}
                    alt="User Icon"
                  />
                </button>
              </span>
              <span className="navbar__icon-wrapper">
                <button className="navbar__icon-btn" aria-label="Koszyk">
                  <img
                    className="navbar__icon"
                    src={cartIcon}
                    alt="Cart Icon"
                  />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
