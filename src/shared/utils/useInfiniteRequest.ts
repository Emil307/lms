import { InfiniteQueryObserverResult, QueryFunction, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { useMemo } from "react";
import { TPaginationResponse } from "../utils";

type TData<T, M = unknown> = {
    data: TPaginationResponse<T[], M> | undefined;
};

/**
 *
 * Хук для запросов с бесконечной пагинацией.
 * Хук должен возвращаться любым хуком для создания запроса с бесконечной пагинацией.
 *
 * @template T - Тип возвращаемого массива данных. Передается как дженерик.
 *
 * @template M - Тип меты. Передается как дженерик.
 *
 * @param queryKey - Массив ключей для кэширования запроса (аналогично 1-ому параметру useQuery в React Query).
 *
 * @param queryFn - Стрелочная функция, возвращающая вызов функции Api (аналогично 2-ому параметру useQuery в React Query).
 * В качестве аргумента может принимать объект со свойством "pageParam" - номер запрашиваемой страницы (по дефолту хук умеет сам изменять номер запрашиваемой страницы перед запросом).
 *
 * @param options - Настройки запроса (аналогично 3-ому параметру useQuery в React Query).
 *
 * @returns Объект со свойством "data" - данные типа {@link TPaginationResponse<T>} и остальными свойствами (isFetching, isError, ...) {@link InfiniteQueryObserverResult<TQueryFnData>}
 */
export function useInfiniteRequest<T, M = unknown, TQueryFnData extends TPaginationResponse<T[], M> = TPaginationResponse<T[], M>>(
    queryKey: QueryKey,
    queryFn: QueryFunction<TQueryFnData, QueryKey>,
    options?: Omit<UseInfiniteQueryOptions<TQueryFnData, unknown, TQueryFnData, TQueryFnData, QueryKey>, "queryKey" | "queryFn"> | undefined
): Omit<InfiniteQueryObserverResult<TQueryFnData>, "data"> & TData<T, M> {
    const fullOptions: typeof options = {
        getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length + 1;
            return nextPage <= lastPage.pagination.totalPages ? nextPage : undefined;
        },
        ...options,
    };

    const { data: infiniteData, ...rest } = useInfiniteQuery(queryKey, queryFn, fullOptions);

    const data = useMemo(() => {
        if (!infiniteData) {
            return;
        }
        const onlyData = infiniteData.pages.map((page) => page.data);
        const meta = infiniteData.pages[0].meta;
        const cleanData = onlyData.flat();
        return { data: cleanData, pagination: infiniteData.pages[infiniteData.pages.length - 1].pagination, meta };
    }, [infiniteData]);

    return { data, ...rest };
}
