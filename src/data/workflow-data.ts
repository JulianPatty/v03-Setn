import { AppEdge, createEdge } from '@/components/edges';
import { AppNode, createNodeByType } from '@/components/nodes';

export const initialNodes: AppNode[] = [
  createNodeByType({ type: 'initial-node', id: 'workflowNode_1' }),
];

export const initialEdges: AppEdge[] = [];