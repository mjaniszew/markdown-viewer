import { useContext } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { SettingsContext } from "../../context/settingsContext";
import { useDocument } from "../../hooks/useDocument";

interface ViewerProps {

}

export const Viewer = ({}: ViewerProps) => {
  const params = new URLSearchParams(window.location.search);
  const docUrl = params.get("doc");
  const document = useDocument(docUrl);
  const settingsState = useContext(SettingsContext);

  const viewerClassNames = "markdown-viewer" +
    ` font-${settingsState.fontSize}` +
    ` theme-${settingsState.theme}`
  ;

  return (
    <div className={viewerClassNames}>
      {document.status === "idle" && <p>No Markdown File Provided</p>}
      {document.status === "loading" && <p>Loading...</p>}
      {document.status === "error" && <p>Error: {document.error}</p>}
      {document.status === "success" && document.content && <Markdown remarkPlugins={[remarkGfm]}>{document.content}</Markdown>}
    </div>
  );
}