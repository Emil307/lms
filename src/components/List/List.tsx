import { ColProps as MColProps, GridProps as MGridProps, Grid, Loader, Flex } from "@mantine/core";
import { ReactNode } from "react";
import { OnChangeFn } from "@tanstack/react-table";
import { Pagination as TPagination } from "@shared/utils";
import { Pagination } from "./components";

export interface ListProps<T> extends Omit<MGridProps, "children"> {
    data?: T[];
    colProps?: MColProps;
    renderItem: ({ data, onClick }: { data: T; onClick: (id: unknown) => void }) => ReactNode;
    onClick?: (id: unknown) => void;
    withPagination?: boolean;
    pagination?: TPagination;
    onPaginationChange?: OnChangeFn<TPagination>;
    isLoading?: boolean;
}

function List<T extends { id: unknown }>({
    data,
    colProps,
    withPagination,
    pagination,
    isLoading,
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
            <Grid {...props} gutter={24} mb={{ sm: -20 }}>
                {data?.map((row) => (
                    <Grid.Col {...colProps} key={`row-${row.id}`} sm={6} pb={{ sm: 20 }}>
                        {renderItem({ data: row, onClick })}
                    </Grid.Col>
                ))}
            </Grid>
            {withPagination && pagination && <Pagination {...pagination} onPaginationChange={onPaginationChange} />}
        </>
    );
}

export default List;
