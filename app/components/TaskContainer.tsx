import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal, Plus, Trash } from 'lucide-react'
import AddTask from './AddTask'

interface TaskContainerProps {
    containerName: string;
    onCancel?: () => void;
}

const TaskContainer = ({ containerName }: TaskContainerProps) => {
    const [showTaskForm, setShowTaskForm] = useState(false)
    return (

        <Card className="w-88 shrink-0 h-full flex flex-col">
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="font-md text-md">{containerName}</CardTitle>

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
                        sideOffset={190}
                        className="p-2 absolute border rounded-xl border-gray-200 bg-white shadow-md"
                    >
                        <DropdownMenuItem className="hover:bg-gray-100 px-3 py-2 rounded-md cursor-pointer">
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="hover:bg-black/10 text-destructive focus:text-destructive flex items-center px-3 py-2 rounded-md cursor-pointer"
                        >
                            <Trash className="h-4 w-4 mr-2" />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <CardDescription className=" text-[12px] text-gray-500">0 tasks</CardDescription>
                {showTaskForm ?
                    (<div className='mt-6'>

                        <AddTask onCancel={() => setShowTaskForm(false)} />
                    </div>


                    ) : (
                        <div className="mt-13  flex flex-col justify-center items-center">
                            <Button
                                variant="ghost"
                                onClick={() => setShowTaskForm(true)}
                                className="mt-2 w-full justify-start text-muted-foreground cursor-pointer"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Task
                            </Button>
                        </div>
                    )
                }
            </CardContent>
        </Card>

    )
}

export default TaskContainer
