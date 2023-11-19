import React, { ReactNode, forwardRef, ComponentType } from "react";

interface Props {
  children?: ReactNode;
  type: "submit" | "button";
  onClick?: () => void;
  onHover?: () => void;
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <button
      ref={ref}
      onClick={props.onClick}
      style={{ height: "25px" }}
      onMouseOver={props.onHover}
    >
      {props.children}
    </button>
  );
});

const HOC = <P extends Object>(Component: ComponentType<P>) => {
  const clickButton = () => {
    console.log("click");
  };

  const newComponent = forwardRef<HTMLButtonElement, P>((props, ref) => {
    return <Component ref={ref} onClick={clickButton} {...props} />;
  });

  return newComponent;
};

const HOCButton3 = HOC(Button);

export { HOCButton3, Button };
