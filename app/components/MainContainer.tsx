import { Button } from '@/components/ui/button'
import React from 'react'
import { SquarePlus } from 'lucide-react'

const MainContainer = () => {
    return (
        <div className='mt-8'>
            <div>
                <Button>
                    <SquarePlus /> Add Container
                </Button></div>
        </div>
    )
}

export default MainContainer