import { createContext } from "react";
import type { SettingsStateType } from "../types";

export const SettingsContext = createContext<SettingsStateType>({
  fontSize: "m",
  theme: "dark"
});