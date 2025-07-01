import { Node, NodeProps, XYPosition } from '@xyflow/react';
import { nanoid } from 'nanoid';

import { iconMapping } from '@/data/icon-mapping';
import nodesConfig, { AppNodeType, NodeConfig, NODE_SIZE } from './config';

import { OutputNode } from './output-node';
import { InitialNode } from './initial-node';
import { TransformNode } from './transform-node';
import { BranchNode } from './branch-node';
import { JoinNode } from './join-node';
import { AgentNode } from './agent-node';

/* WORKFLOW NODE DATA PROPS ------------------------------------------------------ */

export type WorkflowNodeData = {
  title?: string;
  label?: string;
  icon?: keyof typeof iconMapping;
  status?: 'loading' | 'success' | 'error' | 'initial';
};

export type WorkflowNodeProps = NodeProps<Node<WorkflowNodeData>> & {
  type: AppNodeType;
  children?: React.ReactNode;
};

export const nodeTypes = {
  'initial-node': InitialNode,
  'agent-node': AgentNode,
  'output-node': OutputNode,
  'transform-node': TransformNode,
  'branch-node': BranchNode,
  'join-node': JoinNode,
};

export function createNodeByType({
  type,
  id,
  position = { x: 0, y: 0 },
  data,
}: {
  type: AppNodeType;
  id?: string;
  position?: XYPosition;
  data?: WorkflowNodeData;
}): AppNode {
  const node = nodesConfig[type];

  const newNode: AppNode = {
    id: id ?? nanoid(),
    data: data ?? {
      title: node.title,
      status: node.status,
      icon: node.icon,
    },
    position: {
      x: position.x - NODE_SIZE.width * 0.5,
      y: position.y - NODE_SIZE.height * 0.5,
    },
    type,
  };

  return newNode;
}

export type AppNode =
  | Node<WorkflowNodeData, 'initial-node'>
  | Node<WorkflowNodeData, 'agent-node'>
  | Node<WorkflowNodeData, 'transform-node'>
  | Node<WorkflowNodeData, 'join-node'>
  | Node<WorkflowNodeData, 'branch-node'>
  | Node<WorkflowNodeData, 'output-node'>;

// Re-export from config
export { AppNodeType, NodeConfig, NODE_SIZE };
export { default as nodesConfig } from './config';