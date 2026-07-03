"use client";
// src/components/TaskList.tsx
import React from 'react';
import { useGetTasksQuery } from '@/src/store';
import { TaskCard } from './TaskCard';
import { LoadingSpinner } from './LoadingSpinner';

export const TaskList: React.FC<{ onEdit: (task: any) => void }> = ({ onEdit }) => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    return (
      <div className="p-4 text-red-600 dark:text-red-400">
        Error loading tasks: {(error as any)?.data?.message || 'Unknown error'}
      </div>
    );
  }
  if (!tasks || tasks.length === 0) {
    return <div className="p-4 text-center text-gray-500">No tasks yet. Add one!</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} />
      ))}
    </div>
  );
};
