import { useState } from "react";
import toast from "react-hot-toast";
import Input from "@/components/Inputs/input";
import SelectReact, { OptionType } from "@/components/Inputs/select";
import Modal from "@/components/Modals/Modal";
import { createInformeIa } from "@/services/informes";
import { CATEGORIAS_OPTIONS, INITIAL_INFORMEIA } from "./constants";
import { InformeIAFormProps, InformeIAInterface } from "./types";
import styles from '../../../styles/pages/Agent.module.scss';

export default function InformeiaForm({
    onClose,
    visible,
    queryId,
    prompt
}: InformeIAFormProps): JSX.Element | null {

    const [informeiaForm, setinformeiaForm] = useState<InformeIAInterface>(INITIAL_INFORMEIA)

    const onChangeInformeIaForm = <K extends keyof InformeIAInterface>(key: K, value: InformeIAInterface[K]) => {
        setinformeiaForm((prev) => ({ ...prev, [key]: value }));
    }

    const onSelectCategory = (option: OptionType) => {
        if (option === null) return

        setinformeiaForm({
            ...informeiaForm,
            Categoria: {
                value: option.value as number,
                label: option.label
            }
        })
    }

    const onSubmitForm = async () => {
        try {
            if (!queryId) return
            await createInformeIa({
                queryId: queryId,
                body: {
                    Titulo: informeiaForm.Titulo,
                    Descripcion: informeiaForm.Descripcion,
                    Categoria: informeiaForm.Categoria.value
                }
            })
            toast.success('InformeIA creado con exito')
        } catch (error) {
            toast.error('Error creating InformeIA: ' + (error as Error).message);
        } finally {
            onClose()
        }
    }

    return (
        <Modal
            title="Crear InformeIA"
            visible={visible}
            onClose={onClose}
            modalSize="medium"
            actionsBottom={{
                action1: {
                    label: 'Cancelar',
                    action: onClose,
                },
                action2: {
                    label: 'Guardar',
                    action: onSubmitForm,
                    disabled: informeiaForm.Titulo.trim() === '' || informeiaForm.Descripcion.trim() === '',
                },
            }}
        >
            <Input
                label="Titulo"
                placeholder="Escibe el Titulo"
                name="title"
                value={informeiaForm.Titulo}
                onChange={(value) => onChangeInformeIaForm('Titulo', value)}
                extraStyles={{ marginBottom: 20 }}
            />
            <SelectReact
                options={CATEGORIAS_OPTIONS}
                name="category"
                label="Selecciona Categoria"
                value={informeiaForm.Categoria}
                onSelect={onSelectCategory}
                onClear={() => setinformeiaForm({
                    ...informeiaForm,
                    Categoria: CATEGORIAS_OPTIONS[0]
                })}
                extraStyles={{ marginBottom: 20 }}
            />
            <Input
                label="Descripcion"
                placeholder="Escibe la descripcion"
                name="description"
                value={informeiaForm.Descripcion}
                onChange={(value) => onChangeInformeIaForm('Descripcion', value)}
            />
            <div className={styles.form}>
                <p>Este es el prompt:</p>
                <p>{prompt}</p>
            </div>
        </Modal>
    )
}