import React from 'react'
import TableAbonosDetails from './AbonoDetailsTable';
import AbonoDetailsTableInformation from './AbonosDetailsTableInformation'
import { useAbonoDetails } from './useAbono';

export default function AbonosDetails(): JSX.Element {

    const { abonoInformation, isLoading, abonoDetails } = useAbonoDetails()

    return (
        <div >
            <AbonoDetailsTableInformation
                abonoInformation={abonoInformation}
                isLoading={isLoading}
            />

            <TableAbonosDetails
                abonoDetails={abonoDetails || []}
                totalSells={abonoDetails?.length || 0}
                loadMoreProducts={() => { }}

                isLoadingData={isLoading}
                isFetchingNextPage={false}
                isLoadingUseQuery={isLoading}
            />

        </div>
    )
}
