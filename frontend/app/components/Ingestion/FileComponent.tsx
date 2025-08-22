﻿"use client";

import React from "react";
import { FileData, FileMap, statusTextMap } from "@/app/types";
import { FaTrash } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";

import UserModalComponent from "../Navigation/UserModal";

import BEORRIButton from "../Navigation/BEORRIButton";

interface FileComponentProps {
  fileData: FileData;
  fileMap: FileMap;
  handleDeleteFile: (name: string) => void;
  selectedFileData: string | null;
  setSelectedFileData: (f: string | null) => void;
}

const FileComponent: React.FC<FileComponentProps> = ({
  fileData,
  fileMap,
  handleDeleteFile,
  selectedFileData,
  setSelectedFileData,
}) => {
  const openDeleteModal = () => {
    const modal = document.getElementById(
      "remove_file_" + fileMap[fileData.fileID].filename
    );
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  return (
    <div className="flex items-center gap-2 w-full">
      {fileMap[fileData.fileID].status != "READY" ? (
        <div className="flex gap-2">
          {fileMap[fileData.fileID].status != "DONE" &&
            fileMap[fileData.fileID].status != "ERROR" && (
              <BEORRIButton
                title={statusTextMap[fileMap[fileData.fileID].status]}
                className="w-[120px]"
              />
            )}
          {fileMap[fileData.fileID].status == "DONE" && (
            <BEORRIButton
              title={statusTextMap[fileMap[fileData.fileID].status]}
              Icon={FaCheckCircle}
              selected={true}
              className="w-[120px]"
              selected_color={"bg-[#023eba]"}
              selected_text_color="text-white"
            />
          )}
          {fileMap[fileData.fileID].status == "ERROR" && (
            <BEORRIButton
              title={statusTextMap[fileMap[fileData.fileID].status]}
              Icon={MdError}
              className="w-[120px]"
              selected={true}
              selected_color={"bg-warning-oxtari"}
            />
          )}
        </div>
      ) : (
        <div className="flex gap-2">
          <BEORRIButton
            title={fileMap[fileData.fileID].rag_config["Reader"].selected}
            className="w-[120px]"
            text_class_name="truncate w-[100px]"
          />
        </div>
      )}

      <BEORRIButton
        title={
          fileMap[fileData.fileID].filename
            ? fileMap[fileData.fileID].filename
            : "No Filename"
        }
        selected={selectedFileData === fileMap[fileData.fileID].fileID}
        selected_color="bg-[#023eba]"
        selected_text_color="text-white"
        className="flex-grow"
        text_class_name="truncate max-w-[150px] lg:max-w-[300px]"
        onClick={() => {
          setSelectedFileData(fileData.fileID);
        }}
      />

      <BEORRIButton
        Icon={FaTrash}
        onClick={openDeleteModal}
        className="w-[50px]"
        selected={selectedFileData === fileMap[fileData.fileID].fileID}
        selected_color="bg-warning-oxtari"
      />

      <UserModalComponent
        modal_id={"remove_file_" + fileMap[fileData.fileID].filename}
        title={"Remove File"}
        text={
          fileMap[fileData.fileID].isURL
            ? "Do you want to remove the URL?"
            : "Do you want to remove " +
              fileMap[fileData.fileID].filename +
              " from the selection?"
        }
        triggerString="Delete"
        triggerValue={fileMap[fileData.fileID].fileID}
        triggerAccept={handleDeleteFile}
      />
    </div>
  );
};

export default FileComponent;
