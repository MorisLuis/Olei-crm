import { getCurrentMonthRange } from "@/utils/getCurrentMonth";

const { DateStart, DateEnd } = getCurrentMonthRange();

export const Menu = [
    { name: "General", pathname: `general?DateStart=${DateStart}&DateEnd=${DateEnd}`, key: 1 },
    { name: "Productos", pathname: `products?DateStart=${DateStart}&DateEnd=${DateEnd}`, key: 2 }
];
