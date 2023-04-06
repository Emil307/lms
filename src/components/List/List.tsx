import { ColProps as MColProps, GridProps as MGridProps, Grid, Loader, Flex } from "@mantine/core";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { Pagination as TPagination } from "@shared/types";
import { Pagination } from "./components";

export interface ListProps<T> extends Omit<MGridProps, "children"> {
    data?: T[];
    colProps?: MColProps;
    renderItem: ({ data, onClick }: { data: T; onClick: (id: unknown) => void }) => ReactNode;
    onClick?: (id: unknown) => void;
    withPagination?: boolean;
    pagination?: TPagination;
    onPaginationChange?: Dispatch<SetStateAction<TPagination>>;
    isLoading?: boolean;
    cardMore?: ReactNode;
}

function List<T extends { id: unknown }>({
    data,
    colProps,
    withPagination,
    pagination,
    isLoading,
    cardMore,
    renderItem,
    onClick = () => undefined,
    onPaginationChange,
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
                    <Grid.Col {...colProps} key={`row-${row.id}`}>
                        {renderItem({ data: row, onClick })}
                    </Grid.Col>
                ))}
                {data?.length && cardMore && (
                    <Grid.Col {...colProps} key="card-more">
                        {cardMore}
                    </Grid.Col>
                )}
            </Grid>
            {withPagination && pagination && <Pagination {...pagination} onPaginationChange={onPaginationChange} />}
        </>
    );
}

export default List;
