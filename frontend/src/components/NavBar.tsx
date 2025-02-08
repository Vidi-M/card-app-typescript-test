import { NavLink } from "react-router-dom";
import SettingsDialog from "./SettingsDialog";

export default function NavBar() {
  return (
    <nav className="flex justify-center gap-5 dark:bg-gray-900">
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-md font-medium text-white"
        to={"/"}
      >
        All Entries
      </NavLink>
      <NavLink
        className="m-3 p-4 text-xl bg-blue-400 hover:bg-blue-500 dark:bg-blue-900 dark:hover:bg-blue-800 rounded-md font-medium text-white"
        to={"/create"}
      >
        New Entry
      </NavLink>
      <SettingsDialog></SettingsDialog>
    </nav>
  );
}
