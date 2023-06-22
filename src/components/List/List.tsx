import { ColProps as MColProps, GridProps as MGridProps, Grid, Flex } from "@mantine/core";
import { ReactNode, Ref } from "react";
import { TPagination } from "@shared/types";
import { Loader } from "@shared/ui";
import { Pagination } from "./components";

export interface ListProps<T> extends Omit<MGridProps, "children"> {
    data?: T[];
    colProps?: MColProps;
    renderItem: ({ data, onClick }: { data: T; onClick: (id: unknown) => void }) => ReactNode;
    onClick?: (id: unknown) => void;
    withPagination?: boolean;
    pagination?: TPagination;
    declensionWordCountItems?: [string, string, string];
    onPaginationChange?: (page: number) => void;
    isLoading?: boolean;
    cardMore?: ReactNode;
    lastElemRef?: Ref<HTMLDivElement>;
}

function List<T extends { id: unknown }>({
    data,
    colProps,
    withPagination,
    pagination,
    isLoading,
    cardMore,
    renderItem,
    declensionWordCountItems,
    onClick = () => undefined,
    onPaginationChange,
    lastElemRef,
    ...props
}: ListProps<T>) {
    return (
        <>
            {isLoading && (
                <Flex sx={{ w: "100%", justifyContent: "center" }}>
                    <Loader size="lg" />
                </Flex>
            )}
            <Grid {...props} gutter={24}>
                {data?.map((row) => (
                    <Grid.Col {...colProps} key={`row-${row.id}`} ref={lastElemRef}>
                        {renderItem({ data: row, onClick })}
                    </Grid.Col>
                ))}
                {!!data && cardMore && (
                    <Grid.Col {...colProps} key="card-more">
                        {cardMore}
                    </Grid.Col>
                )}
            </Grid>
            {!!data?.length && withPagination && (
                <Pagination data={pagination} declensionWordCountItems={declensionWordCountItems} onPaginationChange={onPaginationChange} />
            )}
        </>
    );
}

export default List;
