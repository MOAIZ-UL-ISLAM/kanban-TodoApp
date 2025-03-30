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
import { MoreHorizontal, Plus, Trash, Edit, Check, X, GripVertical } from 'lucide-react';
import AddTask from './AddTask';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export interface Task {
    id: number;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
    containerId: string; // To track which container the task belongs to
}

interface TaskContainerProps {
    containerId: string;
    containerName: string;
    onDelete?: (name: string) => void;
    onEdit: (oldName: string, newName: string) => void;
    index: number;
    onDragStart: (index: number) => void;
    onDrop: (index: number) => void;
    isDragging: boolean;
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContainer = ({
    containerId,
    containerName,
    onDelete,
    onEdit,
    index,
    onDragStart,
    onDrop,
    isDragging,
    tasks,
    setTasks
}: TaskContainerProps) => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(containerName);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    // Filter tasks that belong to this container
    const containerTasks = tasks.filter(task => task.containerId === containerId);

    const handleEditSave = () => {
        if (!newName.trim()) return;
        onEdit(containerName, newName);
        setIsEditing(false);
    };

    const handleAddTask = (title: string, description: string, priority: "low" | "medium" | "high") => {
        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            completed: false,
            containerId
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setShowTaskForm(false);
    };

    const handleTaskDragStart = (e: React.DragEvent, taskId: number) => {
        e.stopPropagation(); // Prevent container drag event from firing
        e.dataTransfer.setData('taskId', taskId.toString());
    };

    const handleTaskDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleTaskDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const taskId = parseInt(e.dataTransfer.getData('taskId'));

        // Update the task's containerId to move it to this container
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId
                    ? { ...task, containerId }
                    : task
            )
        );
    };

    const handleCompleteTask = (taskId: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const handleDeleteTask = (taskId: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
    };

    const saveTaskEdit = () => {
        if (!editingTask) return;

        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === editingTask.id
                    ? editingTask
                    : task
            )
        );

        setEditingTask(null);
    };

    return (
        <Card
            className={`w-full md:w-80 h-auto min-h-80 flex flex-col rounded-lg border border-gray-200 
                      shadow-md bg-white transition-all duration-300 ease-in-out 
                      ${isDragging ? "shadow-lg border-blue-400 ring-2 ring-blue-200" : "hover:shadow-lg"}`}
            draggable
            onDragStart={() => onDragStart(index)}
            onDrop={(e) => {
                handleTaskDrop(e);
                onDrop(index);
            }}
            onDragOver={handleTaskDragOver}
        >
            <CardHeader className="flex flex-row justify-between items-center p-4 pb-2 border-b bg-gray-50 rounded-t-lg">
                <div className="flex items-center">
                    <GripVertical className="h-4 w-4 mr-2 text-gray-400 cursor-grab" />
                    {isEditing ? (
                        <Input
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onBlur={handleEditSave}
                            onKeyDown={(e) => e.key === 'Enter' && handleEditSave()}
                            autoFocus
                            className="text-md font-medium"
                        />
                    ) : (
                        <CardTitle className="text-base font-semibold text-gray-800">{containerName}</CardTitle>
                    )}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-gray-200"
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
                            <Edit className="h-4 w-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => onDelete?.(containerName)}
                            className="hover:bg-red-50 text-red-600 focus:text-red-700 flex items-center px-3 py-2 rounded-md cursor-pointer"
                        >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 flex-grow overflow-auto">
                <CardDescription className="text-xs text-gray-500 mb-3 flex items-center">
                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-0.5 text-xs font-medium">
                        {containerTasks.length} {containerTasks.length === 1 ? 'task' : 'tasks'}
                    </span>
                </CardDescription>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {containerTasks.map((task) => (
                        editingTask && editingTask.id === task.id ? (
                            <div key={task.id} className="p-3 bg-white rounded-md border border-blue-200 shadow-sm">
                                <div className="space-y-2">
                                    <Input
                                        value={editingTask.title}
                                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                        className="text-sm"
                                        autoFocus
                                    />
                                    <Textarea
                                        value={editingTask.description}
                                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                        className="text-sm min-h-[60px]"
                                    />
                                    <Select
                                        defaultValue={editingTask.priority}
                                        onValueChange={(value) => setEditingTask({ ...editingTask, priority: value as "low" | "medium" | "high" })}
                                    >
                                        <SelectTrigger className="text-sm w-full">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low Priority</SelectItem>
                                            <SelectItem value="medium">Medium Priority</SelectItem>
                                            <SelectItem value="high">High Priority</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <Button type="button" variant="outline" size="sm" onClick={() => setEditingTask(null)} className="h-8">
                                            <X className="h-4 w-4 mr-1" /> Cancel
                                        </Button>
                                        <Button type="button" size="sm" onClick={saveTaskEdit} className="h-8 bg-blue-600 hover:bg-blue-700">
                                            <Check className="h-4 w-4 mr-1" /> Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div
                                key={task.id}
                                className={`p-3 rounded-md relative cursor-move transition-all duration-200 
                                          ${task.completed ? 'bg-gray-50 border border-gray-200' : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm'}`}
                                draggable
                                onDragStart={(e) => handleTaskDragStart(e, task.id)}
                            >
                                <div className="flex items-start justify-between">
                                    <div className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                                        <div className="flex items-center mb-1">
                                            <span className={`w-2 h-2 rounded-full mr-2 ${task.priority === "high" ? "bg-red-500" :
                                                    task.priority === "medium" ? "bg-yellow-500" :
                                                        "bg-green-500"
                                                }`}></span>
                                            <h3 className="font-medium text-sm">{task.title}</h3>
                                        </div>
                                        <p className="text-xs text-gray-600 break-words">{task.description}</p>
                                        <div className="flex mt-2">
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${task.priority === "high" ? "bg-red-100 text-red-800" :
                                                    task.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                                                        "bg-green-100 text-green-800"
                                                }`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex space-x-1 ml-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className={`h-6 w-6 rounded-full ${task.completed ? 'bg-green-100 text-green-600' : 'hover:bg-gray-100'}`}
                                            onClick={() => handleCompleteTask(task.id)}
                                            title={task.completed ? "Mark as incomplete" : "Mark as complete"}
                                        >
                                            <Check className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-full hover:bg-gray-100"
                                            onClick={() => handleEditTask(task)}
                                            title="Edit task"
                                        >
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-full hover:bg-red-100 text-red-500"
                                            onClick={() => handleDeleteTask(task.id)}
                                            title="Delete task"
                                        >
                                            <Trash className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}

                    {containerTasks.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-6 text-center text-gray-500">
                            <p className="text-sm">No tasks yet</p>
                            <p className="text-xs mt-1">Add your first task below</p>
                        </div>
                    )}
                </div>

                {showTaskForm ? (
                    <div className="mt-4">
                        <AddTask onCancel={() => setShowTaskForm(false)} onAdd={handleAddTask} />
                    </div>
                ) : (
                    <div className="mt-4">
                        <Button
                            variant="outline"
                            onClick={() => setShowTaskForm(true)}
                            className="w-full justify-center text-blue-600 border-dashed border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                        >
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