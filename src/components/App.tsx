import { useState } from "react";
import './App.css';
import { SettingsPanel } from "./settingsPanel";
import type { SettingsStateType } from "../types";
import { SettingsContext } from "../context/settingsContext";
import { Viewer } from "./viewer";

export const App = () => {
  const [settignsState, setSettingsState] = useState<SettingsStateType>({
    fontSize: "m",
    theme: "dark"
  });

  return (
    <SettingsContext value={settignsState}>
      <div className={`viewport theme-${settignsState.theme}`}>
        <SettingsPanel
          setSettingsState={setSettingsState}
        />
        <Viewer />
      </div>
    </SettingsContext>
  )
}
