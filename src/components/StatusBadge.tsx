// src/components/StatusBadge.tsx
import React from 'react';
import type { Task } from '@prisma/client';

interface Props {
  status: Task['status'];
}

const statusColors: Record<Task['status'], string> = {
  TODO: 'bg-primary-100 text-primary-800',
  IN_PROGRESS: 'bg-primary-200 text-primary-900',
  DONE: 'bg-primary-500 text-white',
};

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const colorClass = statusColors[status as keyof typeof statusColors] || 'bg-gray-200 text-gray-800';
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>{status.replace('_', ' ')}</span>
  );
};
