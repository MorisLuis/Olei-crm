import { typeTipoDoc } from "@/services/sells/sells.interface";

export type typeLabelTipoDocColor = ['gray', 'purple', 'blue', 'yellow', 'green', 'red'];
export type TagColor = typeLabelTipoDocColor[number];
const tipoDocMap: { [key in typeTipoDoc]: typeLabelTipoDocColor[key] } = {
  0: 'gray',
  1: 'purple',
  2: 'blue',
  3: 'yellow',
  4: 'green',
  5: 'red'
};

export const useTagColor = () => {
  const changeColor = (value: typeTipoDoc) => {
    return tipoDocMap[value] || 'gray';
  };

  return {
    changeColor,
  };
};
