import React, { ReactNode, forwardRef, ComponentType, createRef } from "react";

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
  onClick: () => void;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <button ref={ref} onClick={props.onClick}>
      {props.children}
    </button>
  );
});

const HOC = <P extends Object>(Component: ComponentType<P>) => {
  const componentRef = createRef();

  const clickButton = () => {
    console.log("click");
    console.log(
      (componentRef.current as HTMLBodyElement).getBoundingClientRect().height
    );
  };

  const newComponent = (props: P) => {
    return <Component ref={componentRef} onClick={clickButton} {...props} />;
  };

  return newComponent;
};

const HOCButton3 = HOC(Button);

export default HOCButton3;
