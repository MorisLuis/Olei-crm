import React from 'react';
import styles from '../../styles/Components/Skeleton.module.scss';

const HomeFiltersSkeleton = () : JSX.Element => {
  return (
    <div className={styles.homeFiltersSkeleton}>
      <div className={styles.left}></div>
      <div className={styles.right}></div>
    </div>
  );
};

export default HomeFiltersSkeleton;
