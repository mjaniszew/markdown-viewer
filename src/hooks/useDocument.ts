import { useState, useEffect } from "react";

export type FetchDocumentState = {
  status: "idle" | "loading" | "success" | "error";
  error?: string;
  content?: string;
}

const fetchMarkdown = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
  return response.text();
};

export const useDocument = (docUrl: string | null) => {
  const [document, setDocument] = useState<FetchDocumentState>({ status: "idle" });

  useEffect(() => {
    if (!docUrl) {
      setDocument({ status: "idle" });
      return;
    }

    setDocument({ status: "loading" });

    fetchMarkdown(docUrl)
      .then((content) => setDocument({ status: "success", content }))
      .catch((err) => setDocument({ status: "error", error: err.message }));
  }, []);

  return document;
}