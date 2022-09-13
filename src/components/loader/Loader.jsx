import React from "react";

import { BallTriangle } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%" }}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#1890ff"
        ariaLabel="iTaskManagement"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
