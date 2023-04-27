import React from "react";
import { getFromStorage, useStorageState } from "../../utils/storage-utils";

const themeKey = "isDark";
const storage: Storage = sessionStorage;

type ThemeContextType = {
  theme: string;
  setTheme: (theme: string) => void;
};

const defaultThemeContext: ThemeContextType = {
  theme: getFromStorage(storage, themeKey) || "light",
  setTheme: () => {},
};

const ThemeContext = React.createContext<ThemeContextType>(defaultThemeContext);

type Props = {
  children: React.ReactNode;
};

const changeBodyClass = (theme: string) => {
  const bodyClass = document.body.getAttribute("class") || "";
  if (bodyClass === "") {
    document.body.classList.add(theme);
  } else {
    if (bodyClass !== theme) {
      document.body.classList.remove(bodyClass);
      document.body.classList.add(theme);
    }
  }
};

export const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useStorageState(storage, themeKey);
  console.log("RENDER THEME", theme);
  changeBodyClass(theme || "light");
  return (
    <ThemeContext.Provider
      value={{
        theme: getFromStorage(storage, themeKey) || "light",
        setTheme: (theme: string) => {
          setTheme(theme || "light");
          changeBodyClass(theme || "light");
        },
      }}
    >
      <div id="themeProvider" className={`${theme || "light"}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => React.useContext(ThemeContext);
