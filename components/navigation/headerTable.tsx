'use client';

import React, { useState } from 'react';
import { FilterData, FilterObject } from '@/hooks/Filters/useFilters';
import { FilterSectionType } from '@/hooks/Filters/useFiltersSellsConfig';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import styles from '../../styles/Navigation.module.scss';
import InputSearch from '../Inputs/inputSearch';
import FiltersComponent from '../UI/FiltersComponent';
import OrderComponent, { OrderObject } from '../UI/OrderComponent';
import { Tag } from '../UI/Tag';

interface HeaderInterface {
  //Filters
  filters?: FilterSectionType[];
  filterActive?: string[];

  filtersOfSection?: FilterData[];
  onSelectFilter?: ({
    filterObject,
    filterType,
  }: {
    filterObject?: FilterObject;
    filterType: string;
  }) => void;
  onDeleteFilter?: (filter: string) => void;
  filtersActive?: FilterObject[];

  //Order
  orderSells: OrderObject[];
  onSelectOrder: (value: string | number) => void;
  orderActive: OrderObject;

  onSearch?: (value: string) => void;
  onCleanSearch?: (value: null) => void;

  customFilters?: readonly string[];
  customRenders?: Array<{ [key: string]: React.ReactNode }>;
}

export default function HeaderTable({
  filters,
  filterActive,
  filtersOfSection,
  filtersActive,
  onSelectFilter,
  onDeleteFilter,
  orderSells,
  onSelectOrder,
  orderActive,
  onSearch,
  onCleanSearch,
  customFilters,
  customRenders,
}: HeaderInterface) : JSX.Element {

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openModalBackground, setopenModalBackground] = useState(false);
  const filterVisible = filters && filtersOfSection && onSelectFilter && filtersActive;

  const handleOpenModalFilters = () : void => {
    setopenModalBackground(!openModalBackground);
    setOpenFilterModal(!openFilterModal);
  };

  const handleOpenModalOrders = () : void => {
    setopenModalBackground(!openModalBackground);
    setOpenOrderModal(!openOrderModal);
  };

  const handelCloseBackground = () : void => {
    setopenModalBackground(false);
    setOpenFilterModal(false);
    setOpenOrderModal(false);
  };

  useLockBodyScroll(openFilterModal);

  const renderFilters = () : JSX.Element => (
    <div className={styles.filters}>
      <FiltersComponent
        open={openFilterModal}
        onOpenFilters={handleOpenModalFilters}
        onSelectFilter={onSelectFilter!}
        filterSections={filters!}
        filtersOfSection={filtersOfSection!}
        filtersActive={filtersActive!}
        customFilters={customFilters}
        customRenders={customRenders}
      />

      {filterActive?.map((item, index) => (
        <Tag key={index} close color="yellow" onClose={() => onDeleteFilter?.(item)}>
          {item}
        </Tag>
      ))}
    </div>
  );

  return (
    <>
      <div className={styles.headerTable}>
        {filterVisible && renderFilters()}
        {onSearch && onCleanSearch && (
          <InputSearch onSearch={onSearch} onCleanSearch={onCleanSearch} />
        )}
        {!onSearch && !filterVisible && <div></div>} {/* To send order to right */}
        <OrderComponent
          open={openOrderModal}
          orderOptions={orderSells}
          onOpenOrder={handleOpenModalOrders}
          onSelectOrder={onSelectOrder}
          orderActive={orderActive}
        />
      </div>

      {openModalBackground && (
        <div onClick={handelCloseBackground} className="backgroundModal"></div>
      )}
    </>
  );
}
