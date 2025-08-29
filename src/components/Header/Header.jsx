import "./header.less";

import Topbar from "./components/Topbar/Topbar";
import Navbar from "./components/Navbar/Navbar";

export function Header() {
  return (
    <header className="header">
      <Topbar />
      <Navbar />
    </header>
  );
}
