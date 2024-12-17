import React from 'react';
import { faArrowUpWideShort } from '@fortawesome/free-solid-svg-icons';
import ButtonSmall from '../Buttons/ButtonSmall';
import styles from '../../styles/Filters.module.scss';

export interface OrderObject { order: string; value: string | number; label: string };

interface FiltersComponentInterface {
    open: boolean;

    orderOptions: OrderObject[];
    onOpenOrder: () => void;
    onSelectOrder: (value: string | number) => void;
    orderActive: OrderObject
}


export default function OrderComponent({
    open,
    onOpenOrder,
    orderOptions,
    onSelectOrder,
    orderActive
}: FiltersComponentInterface) {


    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const newValue = checked ? value : undefined;
        if(!newValue) return;
        onSelectOrder(newValue);
    };

    return (
        <div className={styles.filters}>

            <ButtonSmall
                text='Ordenar'
                onClick={onOpenOrder}
                icon={faArrowUpWideShort}
                color='white'
                extraStyles={{ zIndex: open ? 9999 : 9 }}
            />

            {open && (
                <div className={`${styles.modalFilter} ${styles.right}`}>
                    <div className={styles.filterOptions}>
                        {
                            orderOptions.map((item, index) => 
                                <div key={index} className={styles.inputCheck}>
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={item.value}
                                            className={styles.filterItemDetail}
                                            onChange={handleCheckboxChange}
                                            checked={orderActive.value == item.value}
                                        />
                                        <p>
                                            {item.label}
                                        </p>
                                    </label>
                                </div>
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    );
}