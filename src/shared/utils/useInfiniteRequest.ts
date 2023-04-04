import { InfiniteQueryObserverResult, QueryFunction, QueryKey, useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { TPaginationResponse } from "./types";

type TData<T> = {
    data: TPaginationResponse<T[]> | undefined;
};

/**
 *
 * Хук для запросов с бесконечной пагинацией.
 * Хук должен возвращаться любым хуком для создания запроса с бесконечной пагинацией.
 *
 * @template T - Тип возвращаемого массива данных. Передается как дженерик.
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
export function useInfiniteRequest<T, TQueryFnData extends TPaginationResponse<T[]> = TPaginationResponse<T[]>>(
    queryKey: QueryKey,
    queryFn: QueryFunction<TQueryFnData, QueryKey>,
    options?: Omit<UseInfiniteQueryOptions<TQueryFnData, unknown, TQueryFnData, TQueryFnData, QueryKey>, "queryKey" | "queryFn"> | undefined
): Omit<InfiniteQueryObserverResult<TQueryFnData>, "data"> & TData<T> {
    const fullOptions: typeof options = {
        getNextPageParam: (lastPage, pages) => {
            const nextPage = pages.length + 1;
            return nextPage <= lastPage.meta.pagination.total_pages ? nextPage : undefined;
        },
        ...options,
    };

    const { data, ...rest } = useInfiniteQuery<TQueryFnData>(queryKey, queryFn, fullOptions);
    let result: TData<T>["data"];
    if (data) {
        const onlyData = data.pages.map((page) => page.data);
        const cleanData = onlyData.flat();
        result = { data: cleanData, meta: { pagination: data.pages[data.pages.length - 1].meta.pagination } };
    }
    return { data: result, ...rest };
}
