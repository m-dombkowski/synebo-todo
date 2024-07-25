import { createContext, ReactElement, useEffect, useState } from "react";

const MyThemeContext = createContext({
  isDarkTheme: false,
  toggleThemeHandler: () => {},
});

interface ThemePropsInterface {
  children?: JSX.Element | Array<JSX.Element>;
}

export function MyThemeContextProvider(
  props: ThemePropsInterface
): ReactElement {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  useEffect(() => initialThemeHandler());

  function isLocalStorageEmpty(): boolean {
    return !localStorage.getItem("isDarkTheme");
  }

  function initialThemeHandler(): void {
    if (isLocalStorageEmpty()) {
      localStorage.setItem("isDarkTheme", `false`);
      // document!.querySelector("html")!.classList.add("dark");
      setIsDarkTheme(false);
    } else {
      if (localStorage.getItem("isDarkTheme") === "true") {
        const isDarkThemeInStorage: boolean = JSON.parse(
          localStorage.getItem("isDarkTheme")!
        );
        isDarkThemeInStorage &&
          document!.querySelector("html")!.classList.add("dark");
        setIsDarkTheme(true);
      } else if (localStorage.getItem("isDarkTheme") === "false") {
        setIsDarkTheme(false);
      }
    }
  }

  function toggleThemeHandler(): void {
    const isDarkTheme: boolean = JSON.parse(
      localStorage.getItem("isDarkTheme")!
    );
    setIsDarkTheme(!isDarkTheme);
    toggleDarkClassToBody();
    setValueToLocalStorage(isDarkTheme);
  }

  function toggleDarkClassToBody(): void {
    document!.querySelector("html")!.classList.toggle("dark");
  }

  function setValueToLocalStorage(isDarkTheme: boolean): void {
    localStorage.setItem("isDarkTheme", `${!isDarkTheme}`);
  }

  return (
    <MyThemeContext.Provider value={{ isDarkTheme, toggleThemeHandler }}>
      {props.children}
    </MyThemeContext.Provider>
  );
}

export default MyThemeContext;
