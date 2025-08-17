'use client';

import React from 'react';
import styles from '../../../styles/Tables.module.scss';

//
// 🔑 Helpers para soportar nested keys tipadas
//
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

type NestedValue<T, P extends string> =
  P extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
  ? Rest extends DotNestedKeys<T[Key]>
  ? NestedValue<T[Key], Rest>
  : never
  : never
  : P extends keyof T
  ? T[P]
  : never;


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

//
// 🔑 Configuración de columnas
//
export interface ColumnTertiaryConfig<T, P extends DotNestedKeys<T> = DotNestedKeys<T>> {
  key: P;
  label: string;
  render?: (value: NestedValue<T, P>, item: T) => React.ReactNode;
  renderLabel?: (value: NestedValue<T, P>, item: T) => React.ReactNode;
  className?: string;
  width?: string;
}

//
// 🔑 Props del componente
//
interface TableProps<T extends object> {
  data: T; // un solo objeto
  columns: ColumnTertiaryConfig<T>[];
  onClick?: (item: T) => void;
}

//
// 🔑 Componente
//
const TableTertiary = <T extends object>({ data, columns, onClick }: TableProps<T>): JSX.Element => {
  return (
    <div className={styles.tableTertiary} onClick={() => onClick?.(data)}>
      {columns.map((col, colIndex) => {
        const value = getNestedValue(data, col.key);
        return (
          <div key={colIndex} className={styles.item} data-label={col.label}>
            <div className={styles.item__label}>
              {col.renderLabel ? col.renderLabel(value, data) : String(col.label)}
            </div>
            <div className={styles.item__value}>
              {col.render ? col.render(value, data) : String(value)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableTertiary;
