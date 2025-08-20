import React from "react";
import ViewICon from "./icons/ViewICon";

function PreviewPdf({ href }) {
  return (
    <div>
      <a
        href={href}
        download={href}
        className=""
        target="_blank"
        rel="noreferrer"
      >
        <div className="bg-secondary px-5 py-2 rounded-3">
          <ViewICon className="" />
        </div>
      </a>
    </div>
  );
}

export default PreviewPdf;
