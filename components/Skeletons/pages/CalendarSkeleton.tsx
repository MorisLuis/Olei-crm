'use client';

import React from 'react';
import CalendarComponentSkeleton from '@/app/dashboard/calendar/CalendarComponentSkeleton';
import HeaderSkeleton from '../navigation/headerSkeleton';

export default function CalendarSkeleton(): JSX.Element {
    return (
        <>
            <HeaderSkeleton/>
            <CalendarComponentSkeleton/>
        </>
    );
}
