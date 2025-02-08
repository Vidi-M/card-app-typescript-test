// import { faMoon } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect } from "react";
// import { IoMoon } from "react-icons/io5";
// import { IoSunny } from "react-icons/io5";
// import { IconContext } from "react-icons";

export default function DarkMode() {
  const [dark, setDark] = React.useState(document.body.classList.contains("dark"));

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
    localStorage.setItem("dark", (!dark).toString());
  };

  return (
    <div className="pt-4 flex items-center">
      <label className="inline-flex items-center cursor-pointer">
        <span className="ms-3 font-bold text-gray-900 dark:text-gray-300 pr-2">Dark mode</span>
        {/* Toggle */}
        <input type="checkbox" className="sr-only peer" checked={dark} onChange={darkModeHandler} />

        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      </label>
    </div>
  );
}
