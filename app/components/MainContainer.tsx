'use client';

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { SquarePlus } from 'lucide-react'
import AddEditContainer from './AddEditContainer'
import TaskContainer from './TaskContainer';


const MainContainer = () => {
    const [showContainerForm, setShowContainerForm] = useState(false)
    const [containers, setContainers] = useState<string[]>([])
    const handleAddContainer = (name: string) => {
        if (!name.trim()) return;
        setContainers([...containers, name])
        setShowContainerForm(false)
    }
    return (
        <>
            <div className='mt-8'>
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
                <div className="mt-4 space-y-4 flex w-full gap-4">
                    {containers.map((name, index) => (
                        <TaskContainer key={index} containerName={name} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MainContainer