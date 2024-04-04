import { TreeNode } from "./treenode/TreeNode";

export type TreeViewItem = {
  key: string;
  label: string;
  children: {
    key: string;
    label: string;
  }[];
};

export type TreeViewDataIltem = {
  key: string;
  label: string;
  children: TreeViewDataIltem[]
};


export type TreeViewDataType = TreeViewDataIltem

export const TreeView = ({ treeDatas }: { treeDatas:TreeViewDataIltem[]  }) => {
  return (
    <div>
      <ul>
        {treeDatas.map((node, index) => {
          return <TreeNode key={index} node={node} />;
        })}
      </ul>
    </div>
  );
};
