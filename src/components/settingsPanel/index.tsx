import React, { useState, useContext } from "react";
import type { SettingsStateType } from "../../types";
import { SettingsContext } from "../../context/settingsContext";

interface settingsProps {
  setSettingsState: React.Dispatch<React.SetStateAction<SettingsStateType>>
}

export const SettingsPanel = ({setSettingsState}: settingsProps) => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const settingsState = useContext(SettingsContext);
  const onFontSizeChange = (fontSize: string) => {
    setSettingsState(prev => ({...prev, fontSize}))
  }

  const onThemeChange = (theme: string) => {
    setSettingsState(prev => ({...prev, theme}))
  }

  return (
    <div className="setingsPanel">
      {
        settingsOpen && <div className="settingsMenu">
          <label>Theme:</label>
          <button
            onClick={() => onThemeChange("light")}
            className={settingsState.theme === "light" ? "active": "inactive"}
          >Light</button>
          <button
            onClick={() => onThemeChange("dark")}
            className={settingsState.theme === "dark" ? "active": "inactive"}
          >Dark</button>
          <label>Font Size:</label>
          <button
            onClick={() => onFontSizeChange("s")}
            className={settingsState.fontSize === "s" ? "active": "inactive"}
          >Small</button>
          <button
            onClick={() => onFontSizeChange("m")}
            className={settingsState.fontSize === "m" ? "active": "inactive"}
          >Medium</button>
          <button
            onClick={() => onFontSizeChange("l")}
            className={settingsState.fontSize === "l" ? "active": "inactive"}
          >Large</button>
          <label>{"|"}</label>
        </div>
      }
      <div>
        <button
         onClick={() => setSettingsOpen(!settingsOpen)}
         className={settingsOpen ? "active": "inactive"}
        >{settingsOpen ? "Close Settings x" : "Display Settings"}</button>
      </div>
    </div>
  );
}