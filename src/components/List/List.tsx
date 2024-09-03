import { ColProps as MColProps, GridProps as MGridProps, Grid, Box } from "@mantine/core";
import { ReactNode, Ref } from "react";
import { useScrollIntoView } from "@mantine/hooks";
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

function List<T extends { id?: unknown; groupId?: unknown }>({
    data,
    colProps,
    withPagination,
    pagination,
    isLoading,
    cardMore,
    renderItem,
    declensionWordCountItems,
    onClick = () => undefined,
    onPaginationChange = () => undefined,
    lastElemRef,
    ...props
}: ListProps<T>) {
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        duration: 1000,
    });

    const handlePaginationChange = (page: number) => {
        scrollIntoView({ alignment: "end" });
        onPaginationChange(page);
    };

    return (
        <>
            {isLoading && <Loader size="lg" />}
            <Box ref={targetRef} w={1} h={1}></Box>
            <Grid {...props} gutter={24} m={0}>
                {data?.map((row) => (
                    <Grid.Col {...colProps} key={`row-${row.id || row.groupId}`} ref={lastElemRef}>
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
                <Pagination
                    data={pagination}
                    declensionWordCountItems={declensionWordCountItems}
                    onPaginationChange={handlePaginationChange}
                />
            )}
        </>
    );
}

export default List;
