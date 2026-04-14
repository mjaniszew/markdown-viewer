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
      <div>
        <button
         onClick={() => setSettingsOpen(!settingsOpen)}
        >{settingsOpen ? "Close Settings" : "Open Settings"}</button>
      </div>
      {
        settingsOpen && <div className="settingsMenu">
          <label>Theme:</label>
          <button
            onClick={() => onThemeChange("light")}
          >Light</button>
          <button
            onClick={() => onThemeChange("dark")}
          >Dark</button>
          <label>Font Size:</label>
          <button
            onClick={() => onFontSizeChange("s")}
          >Small</button>
          <button
            onClick={() => onFontSizeChange("m")}
          >Medium</button>
          <button
            onClick={() => onFontSizeChange("l")}
          >Large</button>
        </div>
      }
    </div>
  );
}