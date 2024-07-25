// eslint-disable-next-line @typescript-eslint/no-unused-vars
import sunSvg from "../../public/images/icon-sun.svg";
import moonSvg from "../../public/images/icon-moon.svg";
import { useContext, useEffect, useState } from "react";
import MyThemeContext from "../lib/context/Theme";

export default function TopNav() {
  const themeCtx: { isDarkTheme?: boolean; toggleThemeHandler: () => void } =
    useContext(MyThemeContext);
  const [isChecked, setIsChecked] = useState<boolean>(true);

  function toggleThemeHandler(): void {
    themeCtx.toggleThemeHandler();
  }

  useEffect(() => {
    const isInitialDark: boolean = JSON.parse(
      localStorage.getItem("isDarkTheme")!
    );

    isInitialDark ? setIsChecked(true) : setIsChecked(false);
  }, []);

  return (
    <div className="flex justify-between w-full mb-6 md:mb-12">
      <h1 className="font-josefinSansBold tracking-[0.55em] text-l-very-light-gray text-2xl md:text-4xl dark:text-d-very-dark-blue">
        TODO
      </h1>

      <button
        onClick={() => {
          toggleThemeHandler();
          setIsChecked(!isChecked);
        }}
      >
        <img
          className="w-[18px] h-[18px] md:w-7 md:h-7"
          src={isChecked ? sunSvg : moonSvg}
          alt="moon icon"
        ></img>
      </button>
    </div>
  );
}
