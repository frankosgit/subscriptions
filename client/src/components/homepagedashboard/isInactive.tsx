import React from 'react'
import { CardContent } from '../ui/card'
import { Button } from '../ui/button'

interface IHPDIsInactive {
    scrollToTarget: () => void
}

const HPDIsInactive = ({ scrollToTarget }: IHPDIsInactive) => {
    return (
        <>
            <CardContent className="space-y-2 mb-36 mt-12">
                <h1 className='text-2xl'>Your account is inactive, please renew your membership if you want to access our content</h1>
            </CardContent>
            <CardContent className="space-y-2">
                <div className='flex justify-between mt-12'>
                    <Button onClick={scrollToTarget}>Renew membership</Button>
                </div>
            </CardContent>
        </>
    )
}

export default HPDIsInactive