import React, { useState } from "react";
import { TreeView, TreeViewDataIltem } from "../TreeView";
import styles from "./TreeNode.module.scss";
import { classNameModule } from "../../../../utils/class-name/classNameModule";

type OwnProps = {
  node: TreeViewDataIltem;
};

export const TreeNode: React.FC<OwnProps> = ({ node }) => {
  const [showChildren, setShowChildren] = useState(false);

  const className = classNameModule(styles);

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
        {...className(`children`, {
          expanded: showChildren,
        })}
        
      >
        {showChildren && <TreeView treeDatas={node.children} />}
      </div>
    </div>
  );
};
