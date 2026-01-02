import { useState } from "react";
import Input from "@/components/Inputs/input";
import SelectReact, { OptionType } from "@/components/Inputs/select";
import Modal from "@/components/Modals/Modal";


interface InformeIAFormProps {
    visible: boolean
    onClose: () => void
}

interface InformeIAInterface {
    Titulo: string
    Descripcion: string
    Categoria: {
        value: number
        label: string
    }
    PeticionUsuario: string
}

const CATEGORIAS_OPTIONS = [
    { value: 1, label: 'General' },
    { value: 2, label: 'Compras' },
    { value: 3, label: 'Cobranza' },
    { value: 4, label: 'Ventas' },
    { value: 5, label: 'Cuentas por Cobrar' },
    { value: 6, label: 'Existencias e Inventario' },
    { value: 7, label: 'Catalogo Productos' },
    { value: 8, label: 'Catalogo Clientes' },
]

const INITIAL_INFORMEIA: InformeIAInterface = {
    Titulo: '',
    Descripcion: '',
    Categoria: CATEGORIAS_OPTIONS[0],
    PeticionUsuario: ''
}


export default function InformeiaForm({
    onClose,
    visible
}: InformeIAFormProps): JSX.Element | null {

    const [informeiaForm, setinformeiaForm] = useState<InformeIAInterface>(INITIAL_INFORMEIA)

    const onChangeInformeIaForm = <K extends keyof InformeIAInterface>(key: K, value: InformeIAInterface[K]) => {
        setinformeiaForm((prev) => ({   ...prev, [key]: value }));
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

    const onSubmitForm = () => {
        //console.log('Guardando InformeIA:', informeiaForm);
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
                extraStyles={{ marginBottom: 20}}
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
                extraStyles={{ marginBottom: 20}}
            />
            <Input
                label="Descripcion"
                placeholder="Escibe la descripcion"
                name="description"
                value={informeiaForm.Descripcion}
                onChange={(value) => onChangeInformeIaForm('Descripcion', value)}
            />
        </Modal>
    )
}