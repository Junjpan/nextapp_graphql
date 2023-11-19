import React, { useEffect } from "react";
import {
  HOCButton1,
  HOCButton2,
} from "../../../components/HigherOrderComponent";

const Output = () => {
  useEffect(() => {
    if (HOCButton2.add) {
      console.log(HOCButton2.add(2, 4));
    }
  }, [HOCButton2]);

  return (
    <div>
      <HOCButton1 name="HOC Button1" />
      <HOCButton2 />
    </div>
  );
};

export default Output;
