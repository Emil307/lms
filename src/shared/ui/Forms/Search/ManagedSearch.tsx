import React, { ReactNode, memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, BoxProps, Popover, ScrollArea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import {
    TPaginationResponse,
    useConcatOptionsForSelect,
    useInfiniteRequest,
    useIntersection,
    useSelectFilterWithQuery,
} from "@shared/utils";
import { Loader, Paragraph } from "@shared/ui";
import { REQUEST_FILTERS_DEFAULT_PARAMS } from "@shared/constant";
import { ManagedSelectFuncParams } from "./types";
import Search, { SearchProps } from "./Search";
import useStyles from "./ManagedSearch.styles";

export type TManagedSearchProps<T extends Record<string, any> & { id: unknown }> = {
    queryFunction: (params: ManagedSelectFuncParams) => Promise<TPaginationResponse<T[]>>;
    queryKey: (string | string[])[];
    querySearchName: string;
    querySelectName: string;
    debounceTime?: number;
    searchInputProps: SearchProps;
    wrapperContainerProps: Omit<BoxProps, "children">;
    itemComponent: ({
        data,
        onClick,
        isSelected,
    }: {
        data?: T;
        onClick?: (item: T, newSearchValue: string) => void;
        isSelected: boolean;
    }) => ReactNode;
    onSelect: (item: T) => void;
    onClean: () => void;
};

/**
 * Компонент search с react-query.
 * @template T - Тип возвращаемого массива данных.
 * @template E - Тип object для передачи дополнительных параметров для запроса
 */
function ManagedSearch<T extends Record<string, any> & { id: unknown }>(props: TManagedSearchProps<T>) {
    const router = useRouter();
    const { classes } = useStyles();
    const [popoverOpened, setPopoverOpened] = useState(false);
    const {
        queryFunction,
        queryKey,
        querySearchName,
        querySelectName,
        debounceTime,
        itemComponent,
        onSelect,
        onClean,
        searchInputProps,
        wrapperContainerProps,
    } = props;

    const { searchValue, searchValueDebounced, selectedValue, handleChange, handleInput } = useSelectFilterWithQuery({
        querySearchName,
        querySelectName,
        debounceTime,
    });

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const filterForSelectedData = {
        ...REQUEST_FILTERS_DEFAULT_PARAMS,
        filter: { id: Number(selectedValue) },
    } as ManagedSelectFuncParams;

    const filterForSearchedData = { ...REQUEST_FILTERS_DEFAULT_PARAMS, query: searchValueDebounced } as ManagedSelectFuncParams;

    const { data: selectedData } = useQuery<TPaginationResponse<T[]>>(
        [...queryKey, filterForSelectedData],
        () => queryFunction(filterForSelectedData),
        {
            enabled: !!selectedValue,
        }
    );

    const {
        data: searchedData,
        isLoading,
        isRefetching,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteRequest<T>(
        [...queryKey, filterForSearchedData],
        ({ pageParam = 1 }) => queryFunction({ ...filterForSearchedData, page: pageParam }),
        {
            enabled: router.isReady,
        }
    );

    useEffect(() => {
        if (router.isReady && !selectedValue) {
            return onClean();
        }
        if (selectedData && selectedData.data.length) {
            onSelect(selectedData.data[0]);
        }
    }, [selectedData, selectedValue, router.isReady]);

    const handleSelectItem = (item: T, newSearchValue: string) => {
        handleChange(String(item.id));
        handleInput(newSearchValue);
        setPopoverOpened(false);
    };

    const options = useConcatOptionsForSelect({
        searched: searchedData?.data,
        selected: selectedData?.data,
        label: () => "",
        withFullData: true,
    });

    const renderItems = () => {
        return options.map((item) => {
            const isSelected = selectedValue === item.value;
            return (
                <Box key={String(item.value)} ref={lastElemRef}>
                    {itemComponent({ data: item.data, onClick: handleSelectItem, isSelected })}
                </Box>
            );
        });
    };

    const renderNothingFound = () => {
        if (isLoading || isFetching || isRefetching) {
            return <Loader />;
        }

        return (
            <Paragraph variant="text-caption" className={classes.nothingFound}>
                Совпадений не найдено
            </Paragraph>
        );
    };

    const renderContent = () => {
        if (!searchedData?.data.length) {
            return renderNothingFound();
        }
        return (
            <ScrollArea.Autosize
                maxHeight={246}
                style={{ height: "100%", width: "100%", paddingRight: 8 }}
                type="auto"
                offsetScrollbars
                scrollbarSize={4}>
                {renderItems()}
                {(isLoading || isFetching || isRefetching) && <Loader />}
            </ScrollArea.Autosize>
        );
    };

    return (
        <Box {...wrapperContainerProps}>
            <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
                <Popover.Target>
                    <Box onFocusCapture={() => setPopoverOpened(true)} onBlurCapture={() => setPopoverOpened(false)}>
                        <Search {...searchInputProps} styleVariant="default" value={searchValue} setValue={handleInput} />
                    </Box>
                </Popover.Target>
                <Popover.Dropdown className={classes.dropdownContainer} p={8}>
                    {renderContent()}
                </Popover.Dropdown>
            </Popover>
        </Box>
    );
}

export default memo(ManagedSearch) as typeof ManagedSearch;
