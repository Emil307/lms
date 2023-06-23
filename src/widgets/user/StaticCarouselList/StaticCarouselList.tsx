import { Flex, Title, FlexProps, Skeleton } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useEffect } from "react";
import { Carousel } from "@components/Carousel";
import { StaticUserFromList, useStaticUsers } from "@entities/user";
import { StaticCard as StaticUserCard } from "@features/users";
import { initialParams } from "./constants";
import { adaptGetStaticUsersRequest } from "./utils";

export interface StaticCarouselListProps extends Omit<FlexProps, "children"> {
    title?: string;
    roleName: string;
    visible?: boolean;
}

const StaticCarouselList = ({ title = "Наставники помогают найти ответы", roleName, visible, ...props }: StaticCarouselListProps) => {
    const {
        data: staticUsers,
        hasNextPage,
        fetchNextPage,
        isLoading,
    } = useStaticUsers(adaptGetStaticUsersRequest({ ...initialParams, roleName }), visible);

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    if (!staticUsers?.data.length) {
        return null;
    }

    return (
        <Flex {...props} direction="column" gap={32}>
            <Skeleton visible={isLoading} mih={40} radius={24}>
                <Title order={2} color="dark">
                    {title}
                </Title>
            </Skeleton>
            <Skeleton visible={isLoading} mih={420} radius={24}>
                <Carousel<StaticUserFromList> data={staticUsers.data} lastElemRef={lastElemRef} slideSize={424}>
                    {(props) => <StaticUserCard {...props} mah={420} w={424} />}
                </Carousel>
            </Skeleton>
        </Flex>
    );
};

export default StaticCarouselList;
