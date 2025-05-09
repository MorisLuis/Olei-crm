import React from 'react';
import { ProductSquareCardSkeleton } from './Cards/ProductSquareCardSkeleton';
import styles from '../../styles/Components/Skeleton.module.scss';

const GridSkeleton = () : JSX.Element => {
  return (
    <div className={styles.gridSkeleton}>
      <div className={styles.content}>
        {Array.from({ length: 20 }, (_, i) => (
          <ProductSquareCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default GridSkeleton;
