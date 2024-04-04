import React from "react";

import styles from "./Sidebar.module.scss";
import { TreeView, TreeViewDataIltem } from "../treeview/TreeView";

const treeDatas: TreeViewDataIltem[] = [
  {
    key: "0",
    label: "Documents",
    children: [
      {
        key: "0-0",
        label: "Document 1-1",
        children: [
          {
            key: "0-1-1",
            label: "Document-0-1.doc",
            children: [],
          },
          {
            key: "0-1-2",
            label: "Document-0-2.doc",
            children: [],
          },
        ],
      },
    ],
  },
  {
    key: "1",
    label: "Desktop",
    children: [
      {
        key: "1-0",
        label: "document1.doc",
        children: [],
      },
      {
        key: "0-0",
        label: "documennt-2.doc",
        children: [],
      },
    ],
  },

  {
    key: "1",
    label: "Download",
    children: [],
  },
];

export const Sidebar: React.FC = () => {
  return (
    <div className={styles["Sidebar"]}>
      <div className={styles["wrapper"]}>
        <TreeView treeDatas={treeDatas} />
      </div>
    </div>
  );
};
