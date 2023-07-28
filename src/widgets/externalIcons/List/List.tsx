import { Box, Flex, FlexProps, Skeleton, SkeletonProps } from "@mantine/core";
import { useEffect, useMemo } from "react";
import { useIntersection } from "@mantine/hooks";
import { useExternalIcons } from "@entities/externalIcon";
import { Card } from "@features/externalIcons";
import { initialParams } from "./constants";

export interface ListProps extends Omit<FlexProps, "onSelect" | "children"> {
    perPage?: number;
    title?: string;
    selectedIconId?: string;
    skeletonListProps?: SkeletonProps;
    onSelect?: (id: string) => void;
}

const List = ({ perPage, title, onSelect, selectedIconId, skeletonListProps, ...props }: ListProps) => {
    const { data: externalIconsData, hasNextPage, fetchNextPage, isLoading } = useExternalIcons(initialParams);

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    const renderItems = useMemo(
        () =>
            externalIconsData?.data.map((icon) => {
                const isSelected = selectedIconId === icon.id;
                return (
                    <Box key={icon.id} ref={lastElemRef}>
                        <Card data={icon} isSelected={isSelected} onClick={onSelect} />
                    </Box>
                );
            }),
        [externalIconsData, selectedIconId]
    );

    return (
        <Skeleton visible={isLoading} {...skeletonListProps}>
            <Flex {...props} justify="space-between" wrap="wrap">
                {renderItems}
            </Flex>
        </Skeleton>
    );
};

export default List;
