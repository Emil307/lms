import { useDebouncedState } from "@mantine/hooks";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import { useEffect, useState } from "react";
import { REQUEST_FILTERS_DEBOUNCE_TIME } from "@shared/constant";

interface UseSelectFilterWithQueryProps {
    querySearchName: string;
    querySelectName: string;
    debounceTime?: number;
}

export const useSelectFilterWithQuery = ({
    querySearchName,
    querySelectName,
    debounceTime = REQUEST_FILTERS_DEBOUNCE_TIME,
}: UseSelectFilterWithQueryProps) => {
    const [searchValue, setSearch] = useState<string | undefined>("");
    const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

    const [searchValueQuery, setSearchValueQuery] = useQueryParam(querySearchName, withDefault(StringParam, ""), {
        enableBatching: true,
    });
    const [selectedValueQuery, setSelectedValueQuery] = useQueryParam(querySelectName, withDefault(StringParam, ""), {
        enableBatching: true,
    });

    const [searchValueDebounced, setSearchValueDebounced] = useDebouncedState(searchValueQuery, debounceTime);

    // Если изменился url, то меняем главный стейт для инпута-серча
    useEffect(() => {
        setSearch(searchValueQuery);
        setSelectedValue(selectedValueQuery);
        if (searchValueQuery !== searchValueDebounced) {
            setSearchValueDebounced(searchValueQuery);
        }
    }, [searchValueQuery, selectedValueQuery]);

    // Меняем query параметры только после дебаунса
    useEffect(() => {
        setSearchValueQuery(searchValueDebounced || undefined);
        setSelectedValueQuery(selectedValue || undefined);
    }, [searchValueDebounced]);

    const handleInput = (value: string) => {
        if (!value) {
            setSelectedValue(undefined);
        }
        setSearch(value);
        setSearchValueDebounced(value.trim());
    };

    const handleChange = (newSelectedValue?: string) => {
        if (selectedValueQuery === newSelectedValue) {
            return;
        }
        if (newSelectedValue) {
            setSearchValueDebounced("");
        }
        setSelectedValue(newSelectedValue || undefined);
    };

    return { searchValue, searchValueDebounced, selectedValue, handleChange, handleInput };
};
