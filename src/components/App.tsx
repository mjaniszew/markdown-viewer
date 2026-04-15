import { useState, useEffect } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';
import { SettingsPanel } from "./settingsPanel";
import type { SettingsStateType } from "./settingsPanel";
import { useDocument } from "../hooks/useDocument";

export const App = () => {
  const params = new URLSearchParams(window.location.search);
  const docUrl = params.get("doc");
  const [settignsState, setSettingsState] = useState<SettingsStateType>({
    fontSize: "m",
    theme: "dark"
  });
  const document = useDocument(docUrl);

  const viewerClassNames = "markdown-viewer" +
    ` font-${settignsState.fontSize}` +
    ` theme-${settignsState.theme}`
  ;

  return (
    <div className={`viewport theme-${settignsState.theme}`}>
      <SettingsPanel 
        settignsState={settignsState}
        setSettingsState={setSettingsState}
      />
      <div className={viewerClassNames}>
        {document.status === "idle" && <p>No Markdown File Provided</p>}
        {document.status === "loading" && <p>Loading...</p>}
        {document.status === "error" && <p>Error: {document.error}</p>}
        {document.status === "success" && document.content && <Markdown remarkPlugins={[remarkGfm]}>{document.content}</Markdown>}
      </div>
    </div>
  )
}
