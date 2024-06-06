import React from "react";
import HeaderMobile from "./HeaderMobile";
import About from "./About";
import Menu from "./Menu";
import MobileFooter from "./MobileFooter";
import DiscoverLooks from "./DiscoverLooks";
import Barbers from "./Barbers";
const MobileHome = () => {
  return (
    <div>
      <HeaderMobile />
      <About />
      <Menu />
      <Barbers />
      <DiscoverLooks />
      <MobileFooter />
    </div>
  );
};

export default MobileHome;
