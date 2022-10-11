import DataLayout from "../data-layout/DataLayout";
import React, { useState, useEffect } from "react";
import CreateNote from "./components/create-note/CreateNote";
import Results from "./components/results/Results";
import { get_notes } from "../../../../../../api/people/general";
import { useTranslation } from "../../../../../../contexts/translationContext";

export default function Notes({ code }) {
  const { t } = useTranslation();
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    const fetch_notes = async () => {
      const data = await get_notes(code);
      setNotes(data.values || []);
    };
    fetch_notes();
  }, []);

  const onResult = (results) => {
    setNotes(results?.values || []);
  };

  return (
    <DataLayout>
      <DataLayout.Left>
        <DataLayout.Title>{t("add-note-subtitle")}</DataLayout.Title>
        <CreateNote notes={notes} code={code} onResult={onResult} />
      </DataLayout.Left>
      <DataLayout.Right>
        <DataLayout.Title>{t("loaded-notes-subtitle")}</DataLayout.Title>
        <Results onResult={onResult} notes={notes} code={code} />
      </DataLayout.Right>
    </DataLayout>
  );
}
