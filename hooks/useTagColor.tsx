
interface useTagColorInterface {
    value: 0 | 1 | 2 | 3 | 4;
    colorTag: "red" | "blue" | "yellow" | "green" | "gray"
}

export const useTagColor = () => {

    const changeColor = (value: useTagColorInterface['value']) => {

        let color : useTagColorInterface['colorTag'] = "red";

        if (value === 1) color = "red"
        if (value === 2) color = "blue"
        if (value === 3) color = "green"
        if (value === 4) color = "yellow"

        return color
    }

    return {
        changeColor
    }
}