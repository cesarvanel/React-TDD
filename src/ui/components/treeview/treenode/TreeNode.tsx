import React, { useState } from "react";
import { TreeView, TreeViewDataIltem } from "../TreeView";
import styles from "./TreeNode.module.scss";
import { classNames } from "../../../../utils/class-name/class-name";

type OwnProps = {
  node: TreeViewDataIltem;
};

export const TreeNode: React.FC<OwnProps> = ({ node }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleShowChildren = () => {
    setShowChildren(!showChildren);
  };


  return (
    <div className={styles["TreeNode"]}>
      <div
        role="button"
        onClick={handleShowChildren}
        className={styles["text-label"]}
      >
        {node.label}
      </div>

      <div
        {...classNames(styles["children"], {
          [styles["expanded"]]: showChildren,
          [styles["collapsed"]]: !showChildren,
        })}
      >
        {showChildren && <TreeView treeDatas={node.children} />}
      </div>
    </div>
  );
};
