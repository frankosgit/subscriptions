import React from 'react'
import { CardContent } from '../ui/card'
import { AuthState } from '@/models/classes/Auth'
import { Button } from '../ui/button'
import { UnsubscribeDialog } from '../UnsubscribeDialog'
import ReactivateSubscription from '@/custom-hooks/reactivateSubscription'

interface IHPDIsUserWithCardLevel {
    authedUser: AuthState,
    dashboardSubscription: string,
    scrollToTarget: () => void
}

const HPDIsUserWithCardLevel = ({ authedUser, dashboardSubscription, scrollToTarget }: IHPDIsUserWithCardLevel) => {
    const { handleReactivation } = ReactivateSubscription();

    const title = "plan"
    return (
        <>
            <CardContent className="space-y-2">
                <h1 className='text-2xl'>Current tier:</h1>
                <h4 className='text-6xl'>{dashboardSubscription}</h4>
            </CardContent>
            {authedUser.isCancelling &&
                <CardContent className="space-y-2">
                    <h1 className="text-2xl font-bold">{authedUser.daysUntilPayment} days membership left</h1>
                    <h1 className='text-2xl'>We're sad to see you go</h1>
                </CardContent>
            }
            <CardContent className="space-y-2">
                <div className='mt-6 flex'>
                    <div className='flex flex-col items-center text-center'>
                        <h4>Workouts completed</h4>
                        <h2 className='text-6xl'>12</h2>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <h4>Workouts liked</h4>
                        <h2 className='text-6xl'>4</h2>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <h4>Recipies made</h4>
                        <h2 className='text-6xl'>2</h2>
                    </div>
                </div>

            </CardContent>
            <CardContent className="space-y-2">
                <h1>Member since {authedUser.orderDate}</h1>
                {authedUser.isCancelling ? `Your membership ends in ${authedUser.daysUntilPayment} days` : `Your next payment is due in ${authedUser.daysUntilPayment} days`}
            </CardContent>
            <CardContent className="space-y-2">
                {!authedUser.isCancelling && authedUser.isActive &&

                    <div className='flex justify-between'>
                        <Button onClick={() => { scrollToTarget() }}>Upgrade plan</Button>
                        <UnsubscribeDialog title={title} />
                    </div>

                }

                {authedUser.isCancelling && authedUser.isActive &&
                    <Button
                        onClick={() => handleReactivation(authedUser.User?.email as string)}
                        className="ml-4 text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-500"
                    >
                        Resume membership
                    </Button >}
            </CardContent>
        </>
    )
}

export default HPDIsUserWithCardLevel