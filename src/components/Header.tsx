import { useContext } from "react";
import HeaderDesktop from "../../public/images/bg-desktop-light.jpg";
import HeaderMobile from "../../public/images/bg-mobile-light.jpg";
import { ScreenSizeContext } from "../lib/context/ScreenSize";

export default function Header() {
  const { deviceType } = useContext(ScreenSizeContext);

  return (
    <div className="fixed top-0 ">
      <img
        src={deviceType === "desktop" ? HeaderDesktop : HeaderMobile}
        alt="picture of mountains on a purple blue gradient background"
      />
    </div>
  );
}
