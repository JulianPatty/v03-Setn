'use client';

import { useState, useCallback, ComponentProps, useRef } from 'react';
import { Search, Database, Webhook, Code, Route, RotateCcw, Settings } from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';
import { useShallow } from 'zustand/react/shallow';
import { type AppStore } from '@/store/app-store';
import {
  AppNode,
  createNodeByType,
} from '@/components/nodes';

// Define the blocks that should appear in the sidebar
const blockCategories = [
  {
    title: 'Blocks',
    active: true,
    blocks: [
      {
        id: 'agent-node',
        title: 'Agent',
        description: 'Build an agent',
        icon: '🤖',
        bgColor: 'bg-purple-100',
        iconBg: 'bg-purple-600'
      },
      {
        id: 'transform-node',
        title: 'API',
        description: 'Use any API',
        icon: '🌐',
        bgColor: 'bg-blue-100',
        iconBg: 'bg-blue-600'
      },
      {
        id: 'join-node',
        title: 'Database',
        description: 'Database operations',
        icon: '🗄️',
        bgColor: 'bg-blue-100',
        iconBg: 'bg-blue-600'
      },
      {
        id: 'branch-node',
        title: 'Webhook',
        description: 'Receive webhooks',
        icon: '🔗',
        bgColor: 'bg-blue-100',
        iconBg: 'bg-blue-600'
      },
      {
        id: 'transform-node',
        title: 'Condition',
        description: 'Add a condition',
        icon: '🔀',
        bgColor: 'bg-orange-100',
        iconBg: 'bg-orange-600'
      },
      {
        id: 'transform-node',
        title: 'Function',
        description: 'Run custom logic',
        icon: '⚡',
        bgColor: 'bg-red-100',
        iconBg: 'bg-red-600'
      },
      {
        id: 'transform-node',
        title: 'Router',
        description: 'Route workflow',
        icon: '🔄',
        bgColor: 'bg-green-100',
        iconBg: 'bg-green-600'
      },
      {
        id: 'transform-node',
        title: 'Loop',
        description: 'Iterate over items',
        icon: '🔁',
        bgColor: 'bg-purple-100',
        iconBg: 'bg-purple-600'
      }
    ]
  },
  {
    title: 'Tools',
    active: false,
    blocks: []
  }
];

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Blocks');

  return (
    <Sidebar className="border-r-0 w-80" {...props}>
      <SidebarHeader className="p-4 border-b">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-4">
          {blockCategories.map((category) => (
            <Button
              key={category.title}
              variant={activeTab === category.title ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(category.title)}
              className={cn(
                "flex-1",
                activeTab === category.title 
                  ? "bg-gray-100 text-gray-900" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              {category.title === 'Blocks' && <Database className="w-4 h-4 mr-2" />}
              {category.title === 'Tools' && <Settings className="w-4 h-4 mr-2" />}
              {category.title}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {blockCategories
                .find(cat => cat.title === activeTab)
                ?.blocks
                .filter(block => 
                  block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  block.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((block) => (
                  <DraggableBlockItem key={`${block.id}-${block.title}`} {...block} />
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

const selector = (state: AppStore) => ({
  addNode: state.addNode,
  checkForPotentialConnection: state.checkForPotentialConnection,
  resetPotentialConnection: state.resetPotentialConnection,
});

function DraggableBlockItem({ 
  id, 
  title, 
  description, 
  icon, 
  bgColor, 
  iconBg 
}: {
  id: string;
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  iconBg: string;
}) {
  const { screenToFlowPosition } = useReactFlow();
  const { addNode, checkForPotentialConnection, resetPotentialConnection } =
    useAppStore(useShallow(selector));
  const [isDragging, setIsDragging] = useState(false);

  const onClick = useCallback(() => {
    const newNode: AppNode = createNodeByType({
      type: id as any,
      position: screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }),
    });

    addNode(newNode);
  }, [id, addNode, screenToFlowPosition]);

  const onDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData('application/reactflow', JSON.stringify({ id }));
      setIsDragging(true);
    },
    [id]
  );

  const lastDragPos = useRef({ x: 0, y: 0 });
  const onDrag = useCallback(
    (e: React.DragEvent) => {
      const lastPos = lastDragPos.current;
      if (lastPos.x === e.clientX && lastPos.y === e.clientY) {
        return;
      }
      lastDragPos.current = { x: e.clientX, y: e.clientY };

      const flowPosition = screenToFlowPosition({ x: e.clientX, y: e.clientY });
      checkForPotentialConnection(flowPosition, {});
    },
    [screenToFlowPosition, checkForPotentialConnection]
  );

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
    resetPotentialConnection();
  }, [resetPotentialConnection]);

  return (
    <SidebarMenuItem
      className={cn(
        'relative rounded-lg border-2 transition-all cursor-grab active:cursor-grabbing',
        isDragging ? 'border-purple-500 shadow-lg' : 'border-transparent hover:border-gray-200',
        bgColor
      )}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      onClick={onClick}
      draggable
    >
      <div className="flex items-center gap-3 p-3">
        <div className={cn("w-8 h-8 rounded-md flex items-center justify-center text-white text-sm", iconBg)}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
          <p className="text-xs text-gray-600 truncate">{description}</p>
        </div>
      </div>
    </SidebarMenuItem>
  );
}