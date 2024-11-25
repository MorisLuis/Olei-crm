"use client";

import React from 'react';
import MyCalendar from './Calendar';
import Header from '@/components/navigation/header';
import { useRouter } from 'next/navigation';

export default function Calendar() {

    const { push } = useRouter()


    return (
        <div>
            <Header title='Calendario' />
            <MyCalendar 
                onClickEvent={() => push(`calendar/event/1`)}
                onClickDay={() => console.log(true)}
            />

        </div>
    )
}
