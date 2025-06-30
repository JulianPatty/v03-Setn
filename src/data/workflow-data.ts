import { AppEdge, createEdge } from '@/components/edges';
import { AppNode, createNodeByType } from '@/components/nodes';

export const initialNodes: AppNode[] = [
  createNodeByType({ 
    type: 'initial-node', 
    id: 'workflowNode_1',
    position: { x: 0, y: 0 } // This will be centered by the createNodeByType function
  }),
];

export const initialEdges: AppEdge[] = [];