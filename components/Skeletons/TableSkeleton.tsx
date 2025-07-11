import React from 'react';
import styles from '../../styles/Tables.module.scss';

interface TableSkeletonProps {
  columns: number; // number of columns
  rows?: number;   // number of rows to show
}

export default function TableSkeleton({ columns, rows = 10 }: TableSkeletonProps) : JSX.Element {
  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={`th-${index}`}>
                <div className="skeleton skeleton--text" style={{ width: '60%' }}></div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={`td-${rowIndex}-${colIndex}`} className={styles.isSkeleton}>
                  <span className="skeleton skeleton--text"></span>
                  <div className="skeleton skeleton--text"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}