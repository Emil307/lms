import { useMemo } from "react";
import { prepareOptionsForSelect } from "@shared/ui";
import { getArrayUniqueByKey } from "./getArrayUniqueByKey";

interface UseConcatOptionsForSelectProps<T extends Record<string, any>> {
    searched?: T[];
    selected?: T[];
    label: keyof T | ((item: T) => string);
    withFullData?: boolean;
}

export const useConcatOptionsForSelect = <T extends Record<string, any>>({
    searched = [],
    selected = [],
    label,
    withFullData = false,
}: UseConcatOptionsForSelectProps<T>) => {
    return useMemo(() => {
        return prepareOptionsForSelect({
            data: getArrayUniqueByKey(selected.concat(searched), "id"),
            value: "id",
            label,
            withFullData,
        });
    }, [searched, selected]);
};
