import React, { useState } from "react";
import EditNote from "../edit-note/EditNote";
import ReadNote from "../read-note/ReadNote";
import { Inner } from "./styles";

export default function Note({ note, onResult, notes, code, index }) {
  const [editMode, setEditMode] = useState(false);

  const handleSave = (values) => {
    setEditMode(false);
    onResult(values);
  };

  const handleDelete = (values) => {
    onResult(values);
  };

  return (
    <Inner>
      {editMode ? (
        <EditNote
          onCancel={() => setEditMode(false)}
          onResult={handleSave}
          note={note}
          notes={notes}
          code={code}
          index={index}
        />
      ) : (
        <ReadNote
          onEdit={() => setEditMode(true)}
          note={note}
          notes={notes}
          code={code}
          index={index}
          onDelete={handleDelete}
        />
      )}
    </Inner>
  );
}
