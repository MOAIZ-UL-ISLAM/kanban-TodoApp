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
import { CirclePlus, X } from "lucide-react"
import { useState } from "react"

interface AddEditContainerProps {
    onCancel: () => void
    onAdd: (name: string) => void;
}

const AddEditContainer = ({ onCancel, onAdd }: AddEditContainerProps) => {
    const [containerName, setContainerName] = useState("")

    const handleAddContainer = () => {
        if (containerName.trim() === '') return;
        onAdd(containerName)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddContainer();
        } else if (e.key === 'Escape') {
            onCancel();
        }
    }

    return (
        <Card className="w-full max-w-md shadow-lg border-blue-200">
            <CardHeader className="bg-blue-50 border-b pb-3">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-lg text-blue-800">Add New Container</CardTitle>
                        <CardDescription className="text-blue-600">Create a new container to organize your tasks</CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full hover:bg-blue-100">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <form onSubmit={(e) => { e.preventDefault(); handleAddContainer(); }}>
                    <div className="space-y-3">
                        <Label htmlFor="container-name" className="text-sm font-medium">Container Name</Label>
                        <Input
                            id="container-name"
                            placeholder="Enter container name..."
                            value={containerName}
                            onChange={(e) => setContainerName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className="border-gray-300 focus:border-blue-300 focus:ring-blue-200"
                        />
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2 pt-2 border-t bg-gray-50">
                <Button variant="outline" onClick={onCancel} className="border-gray-300">
                    Cancel
                </Button>
                <Button
                    onClick={handleAddContainer}
                    disabled={!containerName.trim()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    <CirclePlus className="h-4 w-4 mr-2" />
                    Add Container
                </Button>
            </CardFooter>
        </Card>
    )
}

export default AddEditContainer