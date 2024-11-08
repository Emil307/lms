import { Box, BoxProps, Flex, FlexProps, Skeleton, SkeletonProps } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { List as ListComponent, ListProps as TListProps } from "@components/List";
import { EmptyData } from "@shared/ui";
import { GroupFromList, useGroups } from "@entities/group";
import { TRouterQueries } from "@shared/types";
import { initialParams } from "./constants";
import { adaptGetGroupsRequest } from "./utils";
import { Card } from "../Card";

export interface ListProps extends BoxProps, Pick<TListProps<GroupFromList>, "colProps" | "withPagination" | "onClick"> {
    perPage?: number;
    headerSlot?: ReactNode;
    footerSlot?: ReactNode;
    skeletonListProps?: SkeletonProps;
    wrapperProps?: FlexProps;
    visible?: boolean;
}

const List = ({
    headerSlot,
    footerSlot,
    colProps = { md: 4, sm: 6 },
    perPage = 6,
    withPagination = false,
    skeletonListProps,
    wrapperProps,
    visible,
    onClick,
    ...props
}: ListProps) => {
    const router = useRouter();
    const params = router.query as TRouterQueries;

    const {
        data: coursesData,
        isFetching,
        isLoading,
    } = useGroups(adaptGetGroupsRequest({ ...initialParams, ...params, perPage }), visible);

    const renderContent = () => {
        if (!isLoading && !coursesData?.data.length) {
            return <EmptyData title="Такого пока нет. Попробуете выбрать другую вкладку" description="" />;
        }

        return (
            <Box {...props} w="100%">
                <ListComponent<GroupFromList>
                    data={coursesData?.data}
                    renderItem={(props) => <Card {...props} />}
                    colProps={colProps}
                    withPagination={withPagination}
                    pagination={coursesData?.pagination}
                    declensionWordCountItems={["курс", "курса", "курсов"]}
                    isLoading={isFetching}
                    onClick={onClick}
                />
            </Box>
        );
    };

    return (
        <Flex direction="column" {...wrapperProps}>
            <Skeleton visible={isLoading} radius={16}>
                {headerSlot}
            </Skeleton>
            <Skeleton visible={isLoading} {...skeletonListProps}>
                {renderContent()}
            </Skeleton>
            <Skeleton visible={isLoading} radius={16} sx={{ display: "flex" }}>
                {footerSlot}
            </Skeleton>
        </Flex>
    );
};

export default List;
