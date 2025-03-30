import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

interface AddTaskProps {
    onCancel?: () => void;
    onAdd?: (title: string, description: string, priority: "low" | "medium" | "high") => void;
}

const AddTask = ({ onCancel, onAdd }: AddTaskProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd?.(title, description, priority);
        setTitle("");
        setDescription("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onCancel?.();
        }
    };

    return (
        <Card className="border border-blue-200 shadow-sm">
            <form onSubmit={handleSave}>
                <CardContent className="p-3 space-y-3">
                    <div>
                        <Input
                            placeholder="Task title"
                            className="text-sm border-gray-300 focus:border-blue-300 focus:ring-blue-100"
                            autoFocus
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <div>
                        <Textarea
                            placeholder="Add a description..."
                            className="text-sm min-h-[60px] border-gray-300 focus:border-blue-300 focus:ring-blue-100"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Select
                            defaultValue={priority}
                            onValueChange={(value) => setPriority(value as "low" | "medium" | "high")}
                        >
                            <SelectTrigger className="text-sm w-full border-gray-300 focus:ring-blue-100">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low" className="flex items-center">
                                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                                    Low Priority
                                </SelectItem>
                                <SelectItem value="medium" className="flex items-center">
                                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                                    Medium Priority
                                </SelectItem>
                                <SelectItem value="high" className="flex items-center">
                                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                                    High Priority
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between p-3 pt-0 border-t">
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={onCancel}
                        className="text-gray-600 hover:text-gray-800 h-8"
                    >
                        <XCircle className="h-4 w-4 mr-1" />
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        size="sm"
                        disabled={!title.trim()}
                        className="bg-blue-600 hover:bg-blue-700 h-8"
                    >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Save Task
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default AddTask;