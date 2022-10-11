import DataLayout from "../data-layout/DataLayout";
import React, { useState, useEffect } from "react";
import UploadFile from "./components/upload-file/UploadFile";
import Results from "./components/results/Results";
import { get_files } from "../../../../../../api/people/general";
import { useTranslation } from "../../../../../../contexts/translationContext";

export default function Files({ code }) {
  const { t } = useTranslation();
  const [files, setFiles] = useState(null);
  const [tags, setTags] = useState([]);

  const fetch_files = async () => {
    const data = await get_files(code);
    setFiles(data.values || []);
  };

  useEffect(() => {
    const labels = [];
    files?.map((v) => v.labels.values?.map((l) => labels.push(l.name)));
    setTags(labels || []);
  }, [files]);

  useEffect(() => {
    fetch_files();
  }, []);

  const onResult = () => {
    fetch_files();
  };

  return (
    <DataLayout>
      <DataLayout.Left>
        <DataLayout.Title>{t("records-title")}</DataLayout.Title>
        <UploadFile tags={tags} files={files} code={code} onResult={onResult} />
      </DataLayout.Left>
      <DataLayout.Right>
        <DataLayout.Title>{t("uploaded-files-subtitle")}</DataLayout.Title>
        <Results files={files} code={code} onResult={onResult} />
      </DataLayout.Right>
    </DataLayout>
  );
}
