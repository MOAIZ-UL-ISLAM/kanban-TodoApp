import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MoreHorizontal, Trash } from 'lucide-react'


const TaskContainer = () => {
    const [showTaskConatiner, setShowTaskConatiner] = useState(false)
    return (
        <div>
            <Card className="w-80 h-full flex flex-col">
                <CardHeader className='flex justify-between items-center'>
                    <CardTitle className='font-md text-md' >To-Do</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100 cursor-pointer">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='p-2 border rounded-xl border-gray-200'>
                            <DropdownMenuItem className='bg-gray-100'>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:text-destructive flex justify-center items-center">
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