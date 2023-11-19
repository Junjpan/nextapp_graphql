import React, { useEffect, createRef, RefObject } from "react";
import {
  HOCButton1,
  HOCButton2,
} from "../../../components/HigherOrderComponent";
import { HOCButton3, Button } from "../../../components/HOC";

const Output = () => {
  const buttonRef = createRef() as RefObject<HTMLButtonElement>;
  const hocRef = createRef() as RefObject<HTMLButtonElement>;

  const getHeight = () => {
    console.log(buttonRef.current?.getBoundingClientRect().height);
  };

  const getWidth = () => {
    console.log(hocRef.current?.getBoundingClientRect().width);
  };
  useEffect(() => {
    if (HOCButton2.add) {
      console.log(HOCButton2.add(2, 4));
    }
  }, [HOCButton2]);

  return (
    <div>
      <HOCButton1 name="HOC Button1" />
      <HOCButton2 />
      <Button type="button" ref={buttonRef} onClick={getHeight}>
        Button 1
      </Button>
      <HOCButton3 ref={hocRef} type={"submit"} onHover={getWidth}>
        HOC with Ref Button
      </HOCButton3>
    </div>
  );
};

export default Output;
