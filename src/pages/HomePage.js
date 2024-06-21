import { Progress } from "antd";
import React from "react";
const HomePage = () => (
  <>
    <Progress type="dashboard" percent={100} />
    <Progress type="dashboard" percent={100} gapDegree={50} />
  </>
);
export default HomePage;
