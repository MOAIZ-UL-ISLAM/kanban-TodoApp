import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";

interface AddTaskProps {
    onCancel?: () => void;
    onAdd?: (title: string, description: string, priority: "low" | "medium" | "high") => void;
}

const AddTask = ({ onCancel, onAdd }: AddTaskProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd?.(title, description, priority);
        setTitle("");
        setDescription("");
    };

    return (
        <Card>
            <form onSubmit={handleSave}>
                <CardContent className="">
                    <div className="space-y-2">
                        <Input placeholder="Task title" className="text-sm" autoFocus value={title} onChange={(e) => setTitle(e.target.value)} />
                        <Textarea placeholder="Add a description..." className="text-sm min-h-[60px]" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <Select onValueChange={(value) => setPriority(value as "low" | "medium" | "high")}>
                            <SelectTrigger className="text-sm w-full">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low Priority</SelectItem>
                                <SelectItem value="medium">Medium Priority</SelectItem>
                                <SelectItem value="high">High Priority</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between p-3 pt-0">
                    <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" size="sm">
                        Save
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default AddTask;
