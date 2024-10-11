import React, { SetStateAction } from "react";

export type IndexNumbers = [number | "", number | ""];

export function onChangeInput(
    values: IndexNumbers,
    min: number,
    max: number,
    setValues: React.Dispatch<SetStateAction<IndexNumbers>>,
    handleOnChange: (newValue: number[]) => void
) {
    return (index: number) => (value: string | number) => {
        const inputValue = value.toString();
        const newValue = inputValue === "" ? "" : parseInt(inputValue, 10);

        const updatedValues = [...values];
        const defaultValue = index === 0 ? min : max;
        updatedValues[index] = newValue === "" ? defaultValue : newValue;

        setValues(updatedValues as IndexNumbers);

        if (updatedValues.every((value) => typeof value === "number")) {
            handleOnChange(updatedValues as number[]);
        }
    };
}

export const normalizeRange = (arr: [number, number], minVal: number, maxVal: number): [number, number] => {
    let [a, b] = arr;

    if (a > b) {
        [a, b] = [b, a];
    }

    a = Math.max(minVal, Math.min(a, maxVal));
    b = Math.max(minVal, Math.min(b, maxVal));

    return [a, b];
};
