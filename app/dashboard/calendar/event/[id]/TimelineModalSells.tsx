'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import SellDetails from '@/app/dashboard/sells/general/[id]/[sellId]/SellDetails';
import ModalDouble from '@/components/Modals/ModalDouble';
import TableSecondary, { ColumnSecondaryConfig } from '@/components/UI/Tables/TableSecondary';
import { TimelineInterface } from '@/interface/calendar';
import { formatDate } from '@/utils/format/formatDate';

interface ModalSellsInterface {
  visible: boolean;
  onClose: () => void;
  sellEvents: TimelineInterface[];
}

export default function TimelineModalSells({
  visible,
  onClose,
  sellEvents
}: ModalSellsInterface): JSX.Element {

  const [openSecondModal, setOpenSecondModal] = useState(false);
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelectItem = (item: TimelineInterface): void => {
    const params = new URLSearchParams(searchParams.toString());
    if (!item.Id_Sell) return
    params.set('sellId', item.Id_Sell.toString());
    push(`${pathname}?${params.toString()}`);
    setOpenSecondModal(true);
  };

  // Close both modals
  const handleCloseModalDouble = (): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('sellId');
    setOpenSecondModal(false);
    onClose();
  };

  // Close only the second modal
  const handleCloseModalSecondary = (): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('sellId');
    push(`${pathname}?${params.toString()}`);
    setOpenSecondModal(false);
  };

  const renderChildrenSecondModal = (): JSX.Element => {
    return <SellDetails />;
  };

  const columnsTimelineSells: ColumnSecondaryConfig<TimelineInterface>[] = [
    {
      key: 'Folio',
      label: 'Folio',
      render: (Folio) => (
        <div>
          <span style={{ fontWeight: 'bold' }}>Folio: </span>
          {Folio?.toString()}
        </div>
      ),
    },
    {
      key: 'Descripcion',
      label: 'Descripcion',
      render: (Descripcion) => <div>{Descripcion?.toString()}</div>,
    },
    {
      key: 'Fecha',
      label: 'Fecha',
      render: (Fecha) => (
        <div>
          <span style={{ fontWeight: 'bold' }}>Fecha: </span>
          {formatDate(Fecha as Date)}
        </div>
      ),
    },
  ];

  return (
    <ModalDouble
      title="Documentos del dia."
      visible={visible}
      visibleSecondModal={openSecondModal}
      onClose={handleCloseModalDouble}
      onCloseSecondModal={handleCloseModalSecondary}
      childrenSecondModal={renderChildrenSecondModal()}
    >
      <p className="instruction">Selecciona uno para ver detalles.</p>
      <TableSecondary
        data={sellEvents}
        columns={columnsTimelineSells}
        onClick={handleSelectItem}
        loadingMoreData={true}
        noMoreData={true}
      />
    </ModalDouble>
  );
}
