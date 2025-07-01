import { useCallback } from 'react';
import { Play, Info, Settings } from 'lucide-react';

import {
  NodeHeaderTitle,
  NodeHeader,
  NodeHeaderActions,
  NodeHeaderAction,
  NodeHeaderDeleteAction,
  NodeHeaderIcon,
} from '@/components/node-header';
import { NODE_SIZE, WorkflowNodeData } from '@/components/nodes/';
import { useWorkflowRunner } from '@/hooks/use-workflow-runner';
import { iconMapping } from '@/data/icon-mapping';
import { BaseNode } from '@/components/base-node';
import { NodeStatusIndicator } from '@/components/node-status-indicator';

// Updated WorkflowNode to match the design in the screenshot
function WorkflowNode({
  id,
  data,
  children,
}: {
  id: string;
  data: WorkflowNodeData;
  children?: React.ReactNode;
}) {
  const { runWorkflow } = useWorkflowRunner();
  const onClick = useCallback(() => runWorkflow(id), [id, runWorkflow]);

  const IconComponent = data?.icon ? iconMapping[data.icon] : undefined;

  return (
    <NodeStatusIndicator status={data?.status}>
      <BaseNode 
        className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-0 rounded-lg overflow-hidden" 
        style={{ ...NODE_SIZE, minWidth: 280 }}
      >
        {/* Node Header */}
        <div className="bg-blue-50 px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                <Play className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 text-sm">Start</h3>
                <p className="text-xs text-gray-600">Start Workflow</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <Info className="w-3 h-3 text-gray-600" />
              </button>
              <button className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <Settings className="w-3 h-3 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Node Content */}
        <div className="p-4">
          <h4 className="font-medium text-gray-900 mb-3">Start Workflow</h4>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
              <Play className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Run manually</span>
              <div className="ml-auto">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {children}
      </BaseNode>
    </NodeStatusIndicator>
  );
}

export default WorkflowNode;