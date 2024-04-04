import React, { useState } from "react";
import { TreeView, TreeViewDataIltem } from "../TreeView";
import styles from "./TreeNode.module.scss";

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
      <div onClick={handleShowChildren} className={styles['text-label']}>{node.label}</div>

      <div className={styles["children"]}>
        {showChildren && <TreeView treeDatas={node.children} />}
      </div>
    </div>
  );
};
