import "./header.less";

import Topbar from "./Topbar";
import Navbar from "./Navbar";

export function Header() {
  return (
    <header className="header">
      <Topbar />
      <Navbar />
    </header>
  );
}
