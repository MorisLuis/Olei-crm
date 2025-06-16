import SubNavigation from "@/components/navigation/subNavigation";

const Menu = [
    { name: "General", pathname: "general", key: 1 },
    { name: "Productos", pathname: "products", key: 2 }
];

export default function GeneralLayout({ children }: { children: React.ReactNode }) : JSX.Element {
    return (
        <>
            <SubNavigation items={Menu} />
            {children}
        </>
    );
}
