'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { SquarePlus } from 'lucide-react';
import AddEditContainer from './AddEditContainer';
import TaskContainer from './TaskContainer';

const MainContainer = () => {
    const [showContainerForm, setShowContainerForm] = useState(false);
    const [containers, setContainers] = useState<string[]>([]);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleAddContainer = (name: string) => {
        if (!name.trim()) return;
        setContainers([...containers, name]);
        setShowContainerForm(false);
    };

    const handleDeleteContainer = (name: string) => {
        setContainers((prevContainers) => prevContainers.filter(container => container !== name));
    };

    const handleEditContainer = (oldName: string, newName: string) => {
        setContainers((prevContainers) =>
            prevContainers.map((container) => (container === oldName ? newName : container))
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
        <>
            <div className="mt-8 flex flex-col items-center justify-center">
                {showContainerForm ? (
                    <AddEditContainer
                        onCancel={() => setShowContainerForm(false)}
                        onAdd={handleAddContainer}
                    />
                ) : (
                    <Button
                        size="lg"
                        onClick={() => setShowContainerForm(true)}
                        className="bg-white cursor-pointer hover:bg-gray-100 text-black px-22 outline-1 border border-black"
                    >
                        <SquarePlus /> Add Container
                    </Button>
                )}

                {/* Render all created containers */}
                <div className="space-y-4 flex w-full gap-4">
                    {containers.map((name, index) => (
                        <TaskContainer
                            key={index}
                            containerName={name}
                            index={index}
                            onEdit={handleEditContainer}
                            onDelete={handleDeleteContainer}
                            onDragStart={handleDragStart}
                            onDrop={handleDrop}
                            isDragging={index === draggedIndex}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MainContainer;
