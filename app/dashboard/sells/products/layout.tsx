import SubNavigation from "@/components/navigation/subNavigation";
import { Menu } from "../sellsMenu";


export default function GeneralLayout({ children }: { children: React.ReactNode }) : JSX.Element {
    return (
        <>
            <SubNavigation items={Menu} />
            {children}
        </>
    );
}
