'use client';

import * as React from 'react';
import { 
  Play, 
  Trash2, 
  RotateCcw, 
  Copy, 
  MoreHorizontal,
  Layers,
  Zap,
  Rocket
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWorkflowRunner } from '@/hooks/use-workflow-runner';

export function AppTopbar() {
  const { runWorkflow, isRunning } = useWorkflowRunner();

  const handleRun = () => {
    runWorkflow();
  };

  return (
    <div className="flex h-14 items-center justify-between border-b bg-background px-6 w-full">
      {/* Left side - Title and status */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">Workflow (DEMO)</h1>
          <p className="text-xs text-muted-foreground">Saved less than a minute ago</p>
        </div>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center gap-2">
        {/* Action buttons */}
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Trash2 className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <RotateCcw className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Copy className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Layers className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Zap className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Rocket className="h-4 w-4" />
        </Button>

        {/* More options dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Run button */}
        <Button 
          onClick={handleRun}
          disabled={isRunning}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6"
        >
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
      </div>
    </div>
  );
}