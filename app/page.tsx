"use client";

import {
  ColorPicker,
  EmptyState,
  ProgressCard,
  TaskFilters,
  TaskForm,
  TaskList,
  ThemeToggle,
} from "@/components/index";
import { useTaskCounts } from "@/hooks/use-task-counts";
import { useTasks } from "@/hooks/use-tasks";
import Image from "next/image";

export default function Home() {
  const {
    allTasks,
    tasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    reorderTasks,
    mounted,
  } = useTasks();

  const counts = useTaskCounts(allTasks);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Image
                src="/scopsis_logo.jpg"
                alt="App logo"
                width={24}
                height={24}
                className="h-12 w-12 object-contain rounded-full"
                priority
              />
              <h1 className="text-3xl font-bold text-balance">Todo App</h1>
            </div>
            <div className="flex items-center gap-2">
              <ColorPicker />
              <ThemeToggle />
            </div>
          </div>
          <p className="text-muted-foreground">Organize your tasks</p>
        </header>

        {/* Main + Sidebar*/}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar: Chart card*/}
          {counts.all > 0 && (
            <aside className="order-1 lg:order-2 w-full lg:w-80 xl:w-96">
              <ProgressCard completed={counts.completed} total={counts.all} />
            </aside>
          )}

          {/* Main content */}
          <main className="order-2 lg:order-1 flex-1 min-w-0">
            {/* Task Form */}
            <div className="mb-6">
              <TaskForm onAddTask={addTask} />
            </div>

            {/* Filters */}
            <div className="mb-6">
              <TaskFilters
                currentFilter={filter}
                onFilterChange={setFilter}
                counts={counts}
              />
            </div>

            {/* Task List */}
            <div>
              {tasks.length === 0 ? (
                <EmptyState filter={filter} />
              ) : (
                <TaskList
                  tasks={tasks}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                  onReorder={reorderTasks}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
