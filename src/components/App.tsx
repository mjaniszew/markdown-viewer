import { useState, useEffect } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';
import { SettingsPanel } from "./settingsPanel";
import type { SettingsStateType } from "./settingsPanel";

const fetchMarkdown = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
  return response.text();
};

type FetchState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; content: string }
  | { status: "error"; message: string };

export const App = () => {
  const [fetchState, setFetchState] = useState<FetchState>({ status: "idle" });
  const [settignsState, setSettingsState] = useState<SettingsStateType>({
    fontSize: "m",
    theme: "dark"
  });

  const viewerClassNames = "markdown-viewer" +
    ` font-${settignsState.fontSize}` +
    ` theme-${settignsState.theme}`
  ;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const docUrl = params.get("doc");

    if (!docUrl) {
      setFetchState({ status: "idle" });
      return;
    }

    setFetchState({ status: "loading" });

    fetchMarkdown(docUrl)
      .then((content) => setFetchState({ status: "success", content }))
      .catch((err) => setFetchState({ status: "error", message: err.message }));
  }, []);

  return (
    <>
      <SettingsPanel 
        settignsState={settignsState}
        setSettingsState={setSettingsState}
      />
      <div className={viewerClassNames}>
        {fetchState.status === "idle" && <p>No Markdown File Provided</p>}
        {fetchState.status === "loading" && <p>Loading...</p>}
        {fetchState.status === "error" && <p>Error: {fetchState.message}</p>}
        {fetchState.status === "success" && <Markdown remarkPlugins={[remarkGfm]}>{fetchState.content}</Markdown>}
      </div>
    </>
  )
}
