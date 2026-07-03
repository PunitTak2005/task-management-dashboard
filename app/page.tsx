"use client";
import React, { useState } from 'react';
import { TaskList } from '@/src/components/TaskList';
import TaskFormModal from '@/src/components/TaskFormModal';
import type { Task } from '@prisma/client';

export default function Home() {
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setEditTask(null);
    setIsOpen(false);
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setEditTask(null);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen p-4 bg-gray-50 dark:bg-gray-900">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Task Management Dashboard
        </h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Add Task
        </button>
      </header>

      <TaskList onEdit={handleEdit} />

      {isOpen && (
        <TaskFormModal task={editTask} onClose={handleClose} />
      )}
    </div>
  );
}
