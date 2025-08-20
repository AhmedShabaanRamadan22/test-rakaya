import Unauthorized from "@/components/icons/Unauthorized";
import React from "react";

function Index() {
  return (
    <div className="d-flex justify-content-center align-content-center">
      <Unauthorized />
    </div>
  );
}

export default Index;
Index.noLayout = true;
