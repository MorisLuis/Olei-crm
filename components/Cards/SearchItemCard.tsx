import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { capitalizarTexto } from '@/utils/textCapitalize';
import styles from '../../styles/Components/Cards.module.scss';

interface Props {
  productName: string;
  onclick: (value: string) => void;
  inputValue: string;
  highlightSearchTerm: (text: string, term: string) => string;
}

export const SearchItemCard = ({
  productName,
  inputValue,
  onclick,
  highlightSearchTerm,
}: Props) : JSX.Element  => {
  return (
    <div className={styles.SearchItemCard} onClick={() => onclick(productName)}>
      <FontAwesomeIcon icon={faMagnifyingGlass} className={`icon__small`} />
      <p
        dangerouslySetInnerHTML={{
          __html: highlightSearchTerm(
            capitalizarTexto(productName),
            typeof inputValue === 'string' ? inputValue : inputValue || ''
          ),
        }}
      />
    </div>
  );
};
