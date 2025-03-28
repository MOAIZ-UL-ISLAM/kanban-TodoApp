'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { SquarePlus } from 'lucide-react'
import AddEditContainer from './AddEditContainer'
import TaskContainer from './TaskContainer'


const MainContainer = () => {
    const [showContainerForm, setShowContainerForm] = useState(false)
    return (
        <>
            <TaskContainer />
            <div className='mt-8'>
                {showContainerForm ? (
                    <AddEditContainer onCancel={() => setShowContainerForm(false)} />
                ) : (<div>
                    <Button size='lg'
                        onClick={() => setShowContainerForm(true)}
                        className='bg-white cursor-pointer hover:bg-gray-100 text-black px-22 outline-1 border border-black'>
                        <SquarePlus /> Add Container
                    </Button>
                </div>)}
            </div>
        </>
    )
}

export default MainContainer