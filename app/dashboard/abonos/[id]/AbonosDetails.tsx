import React from 'react'
import AbonoDetailsTableInformation from './AbonosDetailsTableInformation'
import { useAbonoDetails } from './useAbono';

export default function AbonosDetails() : JSX.Element {

    const {abonoInformation, isLoading } = useAbonoDetails()

    return (
        <div >
            <AbonoDetailsTableInformation
                abonoInformation={abonoInformation}
                isLoading={isLoading}
            />
        </div>
    )
}
