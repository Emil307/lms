import React, { ReactNode, memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDebouncedValue, useIntersection } from "@mantine/hooks";
import { Box, BoxProps, Popover, ScrollArea, Text } from "@mantine/core";
import { TPaginationResponse, useInfiniteRequest } from "@shared/utils";
import { Loader } from "@shared/ui";
import { TExtraFiltersProps, TFunctionParams } from "./types";
import Search, { SearchProps } from "./Search";
import useStyles from "./ManagedSearch.styles";

export type TManagedSearchProps<T extends Record<string, any> & { id: unknown }, E, R> = {
    queryFunction: (params: R) => Promise<TPaginationResponse<T[]>>;
    queryKey: string;
    queryCacheKeys?: Array<keyof R>;
    debounceValue?: number;
    searchInputProps: SearchProps;
    wrapperContainerProps: Omit<BoxProps, "children">;
    onChangeSearchDebouncedValue?: (value: string) => void;
    itemComponent: ({
        data,
        onClick,
        isSelected,
    }: {
        data: T;
        onClick?: (item: T, newSearchValue: string) => void;
        isSelected: boolean;
    }) => ReactNode;
    onSelect: (item: T) => void;
} & TExtraFiltersProps<E>;

/**
 * Компонент search с react-query.
 * @template T - Тип возвращаемого массива данных.
 * @template E - Тип object для передачи дополнительных параметров для запроса
 */
function ManagedSearch<T extends Record<string, any> & { id: unknown }, E = unknown, R = TFunctionParams<E>>(
    props: TManagedSearchProps<T, E, R>
) {
    const router = useRouter();
    const { classes } = useStyles();
    const [popoverOpened, setPopoverOpened] = useState(false);
    const {
        queryFunction,
        queryKey,
        queryCacheKeys = [],
        extraFilterParams = {},
        debounceValue = 1000,
        itemComponent,
        onSelect,
        searchInputProps,
        wrapperContainerProps,
        onChangeSearchDebouncedValue = () => undefined,
    } = props;
    const [query, setQuery] = useState("");
    const [selectedItemId, setSelectedItemId] = useState<unknown | null>(null);
    const [searchDebouncedValue] = useDebouncedValue(query, debounceValue);
    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    useEffect(() => {
        onChangeSearchDebouncedValue(searchDebouncedValue);
    }, [searchDebouncedValue]);

    const paramsForRequest = {
        query: searchDebouncedValue,
        ...extraFilterParams,
    } as R;

    const {
        data: queryData,
        isLoading,
        isRefetching,
        isFetching,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteRequest<T>(
        [queryKey, ...queryCacheKeys.map((key) => paramsForRequest[key])],
        ({ pageParam = 1 }) => queryFunction({ ...paramsForRequest, page: pageParam }),
        {
            enabled: router.isReady,
        }
    );

    const handleSelectItem = (item: T, newSearchValue: string) => {
        onSelect(item);
        setSelectedItemId(item.id);
        setPopoverOpened(false);
        setQuery(newSearchValue);
    };

    const renderItems = () => {
        return queryData?.data.map((item) => {
            const isSelected = selectedItemId === item.id;
            return (
                <Box key={String(item.id)} ref={lastElemRef}>
                    {itemComponent({ data: item, onClick: handleSelectItem, isSelected })}
                </Box>
            );
        });
    };

    const renderNothingFound = () => {
        if (isLoading || isFetching || isRefetching) {
            return <Loader />;
        }

        return <Text className={classes.nothingFound}>Совпадений не найдено</Text>;
    };

    const renderContent = () => {
        if (!queryData?.data.length) {
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
                        <Search {...searchInputProps} styleVariant="default" value={query} setValue={setQuery} />
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
