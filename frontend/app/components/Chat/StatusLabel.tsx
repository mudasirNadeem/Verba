"use client";

import React from "react";

interface StatusLabelProps {
  status: boolean;
  true_text: string;
  false_text: string;
}

const StatusLabel: React.FC<StatusLabelProps> = ({
  status,
  true_text,
  false_text,
}) => {
  return (
    <div
      className={`p-2 rounded-lg text-text-oxtari text-sm ${status ? "bg-secondary-oxtari" : "bg-bg-alt-oxtari text-text-alt-oxtari"}`}
    >
      <p
        className={`text-xs ${status ? "text-text-oxtari" : "text-text-alt-oxtari"}`}
      >
        {status ? true_text : false_text}
      </p>
    </div>
  );
};

export default StatusLabel;
