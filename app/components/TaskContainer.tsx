import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal, Trash } from 'lucide-react'

interface TaskContainerProps {
    containerName: string;
}

const TaskContainer = ({ containerName }: TaskContainerProps) => {
    return (
        <div>
            <Card className="w-80 flex flex-col">
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
                                className="text-destructive focus:text-destructive flex items-center px-3 py-2 rounded-md cursor-pointer"
                            >
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>
            </Card>
        </div>
    )
}

export default TaskContainer
