import React, { useState } from "react";

export type SettingsStateType = {
  fontSize: string;
  theme: string;
}

interface settingsProps {
  settignsState: SettingsStateType
  setSettingsState: React.Dispatch<React.SetStateAction<SettingsStateType>>
}

export const SettingsPanel = ({settignsState, setSettingsState}: settingsProps) => {
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
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
            className={settignsState.theme === "light" ? "active": "inactive"}
          >Light</button>
          <button
            onClick={() => onThemeChange("dark")}
            className={settignsState.theme === "dark" ? "active": "inactive"}
          >Dark</button>
          <label>Font Size:</label>
          <button
            onClick={() => onFontSizeChange("s")}
            className={settignsState.fontSize === "s" ? "active": "inactive"}
          >Small</button>
          <button
            onClick={() => onFontSizeChange("m")}
            className={settignsState.fontSize === "m" ? "active": "inactive"}
          >Medium</button>
          <button
            onClick={() => onFontSizeChange("l")}
            className={settignsState.fontSize === "l" ? "active": "inactive"}
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