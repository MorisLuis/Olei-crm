import { ColumnTertiaryConfig } from "@/components/UI/Tables/TableTertiary";
import { Tag } from "@/components/UI/Tag";
import MeetingInterface from "@/interface/meeting";
import styles from '../../../../styles/pages/SellDetails.module.scss'
import { formatDate } from '@/utils/formatDate';
import { formatTime } from '@/utils/formatTime';
import { contactType } from '@/utils/contactType';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTagColor } from "@/hooks/useTagColor";

interface columnsBitacoraDetailsInterface {
    onOpenComments: () => void;
}

export const ColumnsBitacoraDetails = ({
    onOpenComments
} : columnsBitacoraDetailsInterface) => {

    const { changeColor } = useTagColor();

    const columns: ColumnTertiaryConfig<MeetingInterface>[] = [
        {
            key: 'Title',
            label: 'Titulo',
            render: (_, item: MeetingInterface) => (
                item.Title ?
                <span>{item.Title}</span>
                :
                <Tag color='gray'>No tiene titulo</Tag>
        ),
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Titulo</p>
                </div>
            )
        },
        {
            key: 'Fecha',
            label: 'Fecha',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Fecha</p>
                </div>
            ),
            render: (Fecha) => (
                <div className={styles.sellItem}>
                    <p>{formatDate(Fecha as Date)}</p>
                </div>
            )
        },
        {
            key: 'Hour',
            label: 'Inicio / Fin',
            render: (_, item: MeetingInterface) => (
                    item.Hour ?
                    <span>{formatTime(item.Hour as string)} / {formatTime(item.HourEnd as string)}</span>
                    :
                    <Tag color='gray'>No tiene hora</Tag>
            ),
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Hora</p>
                </div>
            )
        },
        {
            key: 'TipoContacto',
            label: 'TipoContacto',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Tipo de Contacto</p>
                </div>
            ),
            render: (TipoContacto) => (
                <div className={styles.sellItem}>
                    <Tag color={changeColor(TipoContacto as MeetingInterface['TipoContacto'])}>{contactType(TipoContacto as MeetingInterface['TipoContacto'])}</Tag>
                </div>
            )
        },
        {
            key: 'Id_Almacen',
            label: 'Id Almacen',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Id Almacen</p>
                </div>
            )
        },
        {
            key: 'Id_Cliente',
            label: 'Id Cliente',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Id Cliente</p>
                </div>
            )
        },
        {
            key: 'Descripcion',
            label: 'Descripcion',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Descripcion</p>
                </div>
            ),
            render: (value) => (
                <div className={styles.sellItem}>
                    <p className={styles.value}>{value?.toString()}</p>
                </div>
            )
        },
        {
            key: 'Comentarios',
            label: 'Comentarios',
            renderLabel: () => (
                <div className={styles.sellItem}>
                    <p>Comentarios</p>
                </div>
            ),
            render: (value) => (
                <div className={styles.sellItem}>
                    <p className={styles.value}>{value?.toString()}</p>
                    <FontAwesomeIcon icon={faPen} className={`icon__small cursor ${styles.edit}`} onClick={onOpenComments} />
                </div>
            )
        },
    ];


    return {columns};

}