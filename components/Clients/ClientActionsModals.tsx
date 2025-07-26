// components/Clients/ClientActionsModal.tsx

import EmailModal from "@/app/dashboard/clients/[id]/ModalEmail";
import WhatsAppModal from "@/app/dashboard/clients/[id]/ModalWhatsApp";


interface ClientActionsModalProps {
    openModalWhatsApp: boolean;
    openModalEmail: boolean;
    phoneNumber?: string;
    email?: string;
    onCloseWhatsApp: () => void;
    onCloseEmail: () => void;
}

export const ClientActionsModal = ({
    openModalWhatsApp,
    openModalEmail,
    phoneNumber,
    email,
    onCloseWhatsApp,
    onCloseEmail,
}: ClientActionsModalProps) : JSX.Element => (
    <>
        <WhatsAppModal
            visible={openModalWhatsApp}
            onClose={onCloseWhatsApp}
            phoneNumber={phoneNumber}
        />
        <EmailModal visible={openModalEmail} onClose={onCloseEmail} email={email} />
    </>
);
