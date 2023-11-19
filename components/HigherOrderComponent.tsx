import React, { ComponentType, useState } from "react";

//refer to this thread https://stackoverflow.com/questions/32308370/what-is-the-syntax-for-typescript-arrow-functions-with-generics for typescript generic
//example of the video:https://www.youtube.com/watch?v=CD7rN9hoo34
const HOC = <P extends {}>(
  Component: ComponentType<P> & { add?: (a: number, b: number) => number } //static method from the original component, normally we don't have the static method, the prop will be Component:ComponentType<P>
) => {
  const newComponent = (props: P) => {
    const [count, setCount] = useState(0);
    const clickButton = () => {
      setCount(count + 1);
      console.log("click on a button");
    };

    return (
      <>
        {count}
        <Component increase={clickButton} {...props} />
      </>
    );
  };

  newComponent.add = Component.add;
  return newComponent;
};

interface Button1Props {
  name?: string;
  classname?: string;
  increase?: () => void;
}

const Button1 = ({ name, classname, increase }: Button1Props) => {
  return (
    <button onClick={increase} className={classname}>
      {name}
    </button>
  );
};

const Button2 = ({ increase }: Pick<Button1Props, "increase">) => {
  return <button onMouseOver={increase}>'MouseOver Button'</button>;
};
Button2.add = (a: number, b: number) => a + b;

const HOCButton1 = HOC(Button1);
const HOCButton2 = HOC(Button2);

export { HOCButton1, HOCButton2 };
