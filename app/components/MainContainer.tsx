'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { SquarePlus } from 'lucide-react';
import AddEditContainer from './AddEditContainer';
import TaskContainer, { Task } from './TaskContainer';

interface Container {
    id: string;
    name: string;
}

const MainContainer = () => {
    const [showContainerForm, setShowContainerForm] = useState(false);
    const [containers, setContainers] = useState<Container[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleAddContainer = (name: string) => {
        if (!name.trim()) return;
        const newContainer: Container = {
            id: Date.now().toString(),
            name
        };
        setContainers([...containers, newContainer]);
        setShowContainerForm(false);
    };

    const handleDeleteContainer = (name: string) => {
        const containerToDelete = containers.find(c => c.name === name);
        if (!containerToDelete) return;

        // Remove the container
        setContainers((prevContainers) => prevContainers.filter(container => container.name !== name));

        // Remove all tasks associated with this container
        setTasks((prevTasks) => prevTasks.filter(task => task.containerId !== containerToDelete.id));
    };

    const handleEditContainer = (oldName: string, newName: string) => {
        setContainers((prevContainers) =>
            prevContainers.map((container) => (container.name === oldName ? { ...container, name: newName } : container))
        );
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDrop = (index: number) => {
        if (draggedIndex === null || draggedIndex === index) return;

        const updatedContainers = [...containers];
        const draggedItem = updatedContainers[draggedIndex];

        // Remove dragged item and insert at new position
        updatedContainers.splice(draggedIndex, 1);
        updatedContainers.splice(index, 0, draggedItem);

        setContainers(updatedContainers);
        setDraggedIndex(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Kanban Board</h1>
                    <p className="text-gray-600">Organize and manage your tasks with drag and drop functionality</p>
                </div>

                <div className="flex justify-center md:justify-start mb-6">
                    {showContainerForm ? (
                        <AddEditContainer
                            onCancel={() => setShowContainerForm(false)}
                            onAdd={handleAddContainer}
                        />
                    ) : (
                        <Button
                            size="lg"
                            onClick={() => setShowContainerForm(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-sm hover:shadow transition-all"
                        >
                            <SquarePlus className="mr-2" /> Add Container
                        </Button>
                    )}
                </div>

                {containers.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-8 text-center shadow-sm">
                        <div className="max-w-md mx-auto">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">No containers yet</h3>
                            <p className="text-gray-600 mb-4">Create your first container to get started organizing your tasks.</p>
                            <Button
                                onClick={() => setShowContainerForm(true)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <SquarePlus className="mr-2" /> Add Your First Container
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {containers.map((container, index) => (
                            <TaskContainer
                                key={container.id}
                                containerId={container.id}
                                containerName={container.name}
                                index={index}
                                onEdit={handleEditContainer}
                                onDelete={handleDeleteContainer}
                                onDragStart={handleDragStart}
                                onDrop={handleDrop}
                                isDragging={index === draggedIndex}
                                tasks={tasks}
                                setTasks={setTasks}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MainContainer;