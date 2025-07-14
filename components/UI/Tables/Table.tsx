'use client';

import React from 'react';
import ButtonLoad from '@/components/Buttons/ButtonLoad';
import styles from '../../../styles/Tables.module.scss';

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
  handleSelectItem?: (arg: T) => void;

  loadingMoreData: boolean;
  noMoreData: boolean;
  hoverAvailable?: boolean
}

const Table = <T,>({
  data,
  columns,
  handleSelectItem,
  handleLoadMore,
  noMoreData = false,
  loadingMoreData,
  hoverAvailable = true
}: TableProps<T>): JSX.Element => {


  return (
    <div className={styles.table}>

      {/* TABLE */}
      <table>
        <thead>
          <tr >
            {columns.map((col, index) => (
              <th key={index} className={col.className || ''} style={{ width: col.width }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className={hoverAvailable ? `${styles.hoverState}` : ''}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={hoverAvailable ? `${col.className} ${styles.hoverState}` : `${col.className}` || ''}
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
          ))}
        </tbody>
      </table>

      {/* BUTTON LOAD MORE DATA */}
      {!noMoreData && (
        <div className={styles.laodMore}>
          <ButtonLoad
            buttonText="Ver más"
            onClick={handleLoadMore}
            loading={loadingMoreData}
            color="white"
          />
        </div>
      )}

      {/* MESSAGE */}
      {noMoreData && (
        <p className={styles.message}>
          Ya no hay mas productos, cambia los filtros para ver otros resultados
        </p>
      )}
    </div>
  );
};

export default Table;
