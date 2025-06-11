// components/DropdownPortal.tsx
import { ReactNode, ReactPortal } from 'react';
import ReactDOM from 'react-dom';

type Props = {
    children: ReactNode;
};

const DropdownPortal = ({ children }: Props) : ReactPortal | null => {
    const dropdownRoot = document.getElementById('dropdown-root');
    if (!dropdownRoot) return null;
    return ReactDOM.createPortal(children, dropdownRoot);
};

export default DropdownPortal;
