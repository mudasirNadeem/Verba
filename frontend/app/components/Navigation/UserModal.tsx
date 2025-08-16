"use client";

import React from "react";

interface UserModalComponentProps {
  modal_id: string;
  title: string;
  text: string;
  triggerAccept?: null | ((a: any) => void);
  triggerValue?: any | null;
  triggerString?: string | null;
}

import BEORRIButton from "./BEORRIButton";

const UserModalComponent: React.FC<UserModalComponentProps> = ({
  title,
  modal_id,
  text,
  triggerAccept,
  triggerString,
  triggerValue,
}) => {
  return (
    <dialog id={modal_id} className="modal">
      <div className="modal-box flex flex-col gap-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="whitespace-pre-wrap">{text}</p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            {triggerAccept && triggerString && (
              <BEORRIButton
                type="submit"
                title={triggerString}
                onClick={() => {
                  triggerAccept(triggerValue);
                }}
                className="hover:!bg-white hover:!text-black"
              />
            )}
            <BEORRIButton
              type="submit"
              title="Cancel"
              selected_color="bg-warning-verba"
              selected={true}
              className="hover:!bg-warning-verba"
            />
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UserModalComponent;
