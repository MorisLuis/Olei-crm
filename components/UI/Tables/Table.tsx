"use client";

import React from 'react';
import styles from '../../../styles/Tables.module.scss';
import ButtonLoad from '@/components/Buttons/ButtonLoad';

export interface ColumnConfig<T> {
    key: keyof T;
    label: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
    className?: string;
    width?: string;
}

interface TableProps<T> {
    data: T[];
    columns: ColumnConfig<T>[];
    handleLoadMore: () => void;
    loadingMoreData: boolean;
    noMoreData: boolean;
    handleSelectItem?: (arg: T) => void
}

const Table = <T,>({
    data,
    columns,
    noMoreData = false,
    handleSelectItem,
    handleLoadMore,
    loadingMoreData
}: TableProps<T>) => {

    return (
        <div className={styles.table}>
            <table>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th
                                key={index}
                                className={col.className || ''}
                                style={{ width: col.width }}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={col.className || ''}
                                        data-label={col.label}
                                        style={{ width: col.width }}
                                        onClick={() => handleSelectItem?.(item)}
                                    >
                                        {col.render
                                            ? col.render(item[col.key], item)
                                            : (item[col.key] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {
                !noMoreData &&
<div className={styles.laodMore}>
                    <ButtonLoad
                        buttonText='Ver más'
                        onClick={handleLoadMore}
                        loading={loadingMoreData}
                        color='white'
                    />
                </div>
            }

            {
                noMoreData &&
                <p className={styles.message}>Ya no hay mas productos, cambia los filtros para ver otros resultados</p>
            }
        </div>
    );
};


export default Table;
