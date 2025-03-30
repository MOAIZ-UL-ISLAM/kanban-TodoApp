'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MoreHorizontal, Plus, Trash } from 'lucide-react';
import AddTask from './AddTask';
import { Input } from '@/components/ui/input';


interface Task {
    id: number;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
}


interface TaskContainerProps {
    containerName: string;
    onDelete?: (name: string) => void;
    onEdit: (oldName: string, newName: string) => void;
    index: number;
    onDragStart: (index: number) => void;
    onDrop: (index: number) => void;
    isDragging: boolean;
}

const TaskContainer = ({ containerName, onDelete, onEdit, index, onDragStart, onDrop, isDragging }: TaskContainerProps) => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(containerName);
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleEditSave = () => {
        if (!newName.trim()) return;
        onEdit(containerName, newName);
        setIsEditing(false);
    };
    const handleAddTask = (title: string, description: string, priority: "low" | "medium" | "high") => {
        setTasks([...tasks, { id: Date.now(), title, description, priority }]);
        setShowTaskForm(false);
    };

    return (
        <Card
            className={`w-88 shrink-0 h-full flex flex-col cursor-grab rounded-lg border border-gray-200 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out ${isDragging ? "animate-flash border-yellow-500" : ""
                }`}
            draggable
            onDragStart={() => onDragStart(index)}
            onDrop={() => onDrop(index)}
            onDragOver={(e) => e.preventDefault()}
        >
            <CardHeader className="flex justify-between items-center">
                {isEditing ? (
                    <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        onBlur={handleEditSave}
                        autoFocus
                        className="text-md font-medium"
                    />
                ) : (
                    <CardTitle className="font-md text-md">{containerName}</CardTitle>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-gray-100 cursor-pointer"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="p-2 border rounded-xl border-gray-200 bg-white shadow-md"
                    >
                        <DropdownMenuItem
                            onClick={() => setIsEditing(true)}
                            className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer"
                        >
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete?.(containerName)}
                            className="hover:bg-black/10 text-destructive focus:text-destructive flex items-center px-3 py-2 rounded-md cursor-pointer"
                        >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-[12px] text-gray-500">{tasks.length} tasks</CardDescription>
                <ul className="mt-4 space-y-2">
                    {tasks.map((task) => (
                        <li key={task.id} className="p-2 bg-gray-100 rounded-md">
                            <strong>{task.title}</strong>
                            <p className="text-xs text-gray-600">{task.description}</p>
                            <span className={`text-xs font-semibold ${task.priority === "high" ? "text-red-500" : task.priority === "medium" ? "text-yellow-500" : "text-green-500"}`}>
                                {task.priority.toUpperCase()}
                            </span>
                        </li>
                    ))}
                </ul>

                {showTaskForm ? (
                    <div className="mt-6">
                        <AddTask onCancel={() => setShowTaskForm(false)} onAdd={handleAddTask} />
                    </div>
                ) : (
                    <div className="mt-13 flex flex-col justify-center items-center">
                        <Button variant="ghost" onClick={() => setShowTaskForm(true)} className="mt-2 w-full justify-start text-muted-foreground cursor-pointer">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Task
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default TaskContainer;
