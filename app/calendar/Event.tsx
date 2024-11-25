"use client";

import Modal from '@/components/Modals/Modal'
import React from 'react';


interface EventInterface {
    visible: boolean;
    onClose: () => void;
}

export default function Event({
    visible,
    onClose
}: EventInterface) {

    return (
        <Modal
            title='Reunion'
            visible={visible}
            onClose={onClose}
            modalSize='medium'

        >
            <div 
                style={{
                    display: 'flex',
                    gap: 20
                }}
            >
                <div
                    style={{
                        width: "50%"
                    }}
                >
               {/*  <MyTimeline /> */}
                </div>
                <div
                    style={{
                        width: "50%"
                    }}
                >
                    <h1>evento</h1>
                    <p>Titulo de la reunion</p>
                </div>
            </div>

        </Modal>
    )
}
