import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus } from "lucide-react"
import { useState } from "react"
import TaskContainer from "./TaskContainer"

interface AddEditContainerProps {
    onCancel: () => void
    onAdd: (name: string) => void;
}


const AddEditContainer = ({ onCancel, onAdd }: AddEditContainerProps) => {
    const [showTaskContainer, setShowTaskConatiner] = useState(false)
    const [containerName, setContainerName] = useState("")

    const handleAddContainer = () => {
        if (containerName.trim() === '') return;
        onAdd(containerName)

    }
    return (
        <div>

            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Add Container</CardTitle>
                    <CardDescription>Type your Container Name</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Container Name" value={containerName} onChange={(e) => setContainerName(e.target.value)} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={onCancel}>Cancel</Button>
                    <Button className="cursor-pointer hover:bg-gray-500" title="Add Container" onClick={handleAddContainer} ><CirclePlus />Add</Button>
                </CardFooter>
            </Card>
            {showTaskContainer && <TaskContainer containerName={containerName} />}

        </div>
    )
}

export default AddEditContainer

