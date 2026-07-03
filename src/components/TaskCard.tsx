// src/components/TaskCard.tsx
import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { Task } from '@prisma/client';
import { useUpdateTaskMutation, useDeleteTaskMutation } from '@/src/store';

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<Props> = ({ task, onEdit }) => {
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleStatusToggle = async () => {
    const nextStatus =
      task.status === 'TODO'
        ? 'IN_PROGRESS'
        : task.status === 'IN_PROGRESS'
        ? 'DONE'
        : 'TODO';
    await updateTask({ id: task.id, data: { status: nextStatus } });
  };

  const handleDelete = async () => {
    if (confirm('Delete this task?')) {
      await deleteTask(task.id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleStatusToggle}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Toggle status"
          >
            {/* Using a generic icon; could replace with status‑specific icon */}
            <Edit size={16} />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 hover:bg-red-200 dark:hover:bg-red-700 rounded text-red-600"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
      )}
      <div className="flex items-center justify-between mt-2">
        <StatusBadge status={task.status} />
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
