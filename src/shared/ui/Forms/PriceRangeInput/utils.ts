import React, { ChangeEvent, SetStateAction } from "react";

export type IndexNumbers = [number | "", number | ""];

export function onChangeInput(
    values: IndexNumbers,
    min: number,
    max: number,
    setValues: React.Dispatch<SetStateAction<IndexNumbers>>,
    handleOnChange: (newValue: number[]) => void
) {
    return (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        const newValue = inputValue === "" ? "" : parseInt(inputValue, 10);

        const updatedValues = [...values];
        updatedValues[index] = newValue === "" ? (index === 0 ? min : max) : newValue;

        setValues(updatedValues as IndexNumbers);

        if (updatedValues.every((value) => typeof value === "number")) {
            handleOnChange(updatedValues as number[]);
        }
    };
}
