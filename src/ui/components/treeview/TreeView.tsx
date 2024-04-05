import { TreeNode } from "./treenode/TreeNode";


type TreeViewLabel = {
    key: string;
    label: string;
}

export type TreeViewItem = {
  item: TreeViewLabel
  children: TreeViewLabel[]
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
