import React, { useRef } from "react";

import styles from "./PopOver.module.scss";
import { classNameModule } from "../../../utils/class-name/classNameModule";
import useClickOutside from "../../../hook/use-onclick-outside";

const className = classNameModule(styles);

interface OwnProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const PopOver: React.FC<OwnProps> = ({ children, isOpen, onClose }) => {

 const ref =  useClickOutside<HTMLDivElement>(()=>onClose())

  return (
    <div ref={ref} {...className("PopOver", { open: isOpen })}>
      <div >{children}</div>
    </div>
  );
};
