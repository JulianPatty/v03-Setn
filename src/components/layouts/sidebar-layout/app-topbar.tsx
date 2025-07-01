'use client';

import * as React from 'react';
import { 
  Save,
  Download,
  MoreHorizontal,
  Play
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
    <div className="flex h-14 items-center justify-between border-b bg-white px-6 w-full">
      {/* Left side - Workflow info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center text-white font-semibold text-sm">
            W
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">Workflow 0</h1>
            <p className="text-xs text-gray-500">Saved less than a minute ago</p>
          </div>
        </div>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="text-gray-600">
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        
        <Button variant="ghost" size="sm" className="text-gray-600">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>

        {/* More options dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="text-gray-600">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
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