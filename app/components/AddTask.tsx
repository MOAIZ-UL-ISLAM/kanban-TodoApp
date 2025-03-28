import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React from 'react'

interface AddTaskProps {
    onCancel?: () => void;
    onAdd?: (name: string) => void;
}


const AddTask = ({ onCancel }: AddTaskProps) => {
    return (
        <Card className=''>
            <form >
                <CardContent className="">
                    <div className="space-y-2">
                        <Input
                            placeholder="Task title"
                            className="text-sm"
                            autoFocus
                        />
                        <Textarea
                            placeholder="Add a description..."

                            className="text-sm min-h-[60px]"
                        />
                        <Select >
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
                    <Button type="button" variant="ghost" size="sm" onClick={onCancel} >
                        Cancel
                    </Button>
                    <Button type="submit" size="sm" >
                        Save
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default AddTask