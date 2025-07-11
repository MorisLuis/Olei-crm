import React from 'react';

const CalendarComponentSkeleton = () : JSX.Element => {

    return (
        <div>
            <div className='display-flex space-between'>
                <div className='skeleton skeleton--text utils__marginBottom'></div>
                <div className='skeleton skeleton--text utils__marginBottom'></div>
            </div>
            <div className='skeleton--background' style={{ width: "100%", minHeight: "400px"}}>
            </div>
        </div>
    )
};

export default CalendarComponentSkeleton;
