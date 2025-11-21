'use client';

import React from 'react';
import ButtonLoad from '@/components/Buttons/ButtonLoad';
import styles from '../../../styles/Components/Table/Table.module.scss';


type DotNestedKeys<T> = (
  T extends object
  ? {
    [K in keyof T & string]:
    T[K] extends object
    ? `${K}` | `${K}.${DotNestedKeys<T[K]>}`
    : `${K}`
  }[keyof T & string]
  : never
);

type NestedValue<T, Path extends string> =
  Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
  ? Rest extends string
  ? NestedValue<T[Key], Rest>
  : never
  : never
  : Path extends keyof T
  ? T[Path]
  : never;

export interface ColumnConfig<T> {
  key: DotNestedKeys<T>;
  label: string;
  render?: <K extends DotNestedKeys<T>>(
    value: NestedValue<T, K>,
    item: T
  ) => React.ReactNode;
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
  hoverAvailable?: boolean;
}

function getNestedValue<T extends object, K extends DotNestedKeys<T>>(
  obj: T,
  path: K
): NestedValue<T, K> {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object') {
      return acc[key as keyof typeof acc];
    }
    return undefined;
  }, obj) as NestedValue<T, K>;
}

const Table = <T extends object>({
  data,
  columns,
  handleSelectItem,
  handleLoadMore,
  noMoreData = false,
  loadingMoreData,
  hoverAvailable = true,
}: TableProps<T>): JSX.Element => {


  return (
    <div className={styles.table}>
      <div className={styles.tableScroll}>

        {/* TABLE */}
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
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={hoverAvailable ? `${styles.hoverState}` : ''}
              >
                {columns.map((col, colIndex) => {
                  const value = getNestedValue(item, col.key);

                  return (
                    <td
                      key={colIndex}
                      className={
                        hoverAvailable
                          ? `${col.className} ${styles.hoverState}`
                          : `${col.className}` || ''
                      }
                      data-label={col.label}
                      style={{ width: col.width }}
                      onClick={() => handleSelectItem?.(item)}
                    >
                      {col.render
                        ? col.render(value, item)
                        : (value as React.ReactNode)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
          Ya no hay más productos, cambia los filtros para ver otros resultados
        </p>
      )}
    </div>
  );
};

export default Table;
