'use client';

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React from 'react';
import ButtonSmall from '@/components/Buttons/ButtonSmall';
import styles from './../../../styles/pages/NotFound.module.scss';

interface Custum500Interface {
  handleRetry: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, Error>>;
}

const Custum500 = ({
  handleRetry
}: Custum500Interface): JSX.Element => {
  return (
    <div className={styles.NotFound}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={styles.title}
        >
          500
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={styles.message}
        >
          Lo sentimos, hubo un error en el servidor intentalo más tarde. 😞
          <ButtonSmall text="Volver al intentarlo" onClick={handleRetry} />
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Custum500;
