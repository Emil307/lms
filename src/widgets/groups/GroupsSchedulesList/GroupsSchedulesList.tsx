import { useRouter } from "next/router";
import { useEffect } from "react";
import { Flex, Skeleton } from "@mantine/core";
import { Heading } from "@shared/ui";
import { Carousel } from "@components/Carousel";
import { GroupSchedulesInfo, useGroupsSchedules } from "@entities/group";
import { useIntersection } from "@shared/utils";
import { Card } from "./components";
import { initialParams } from "./constants";

const GroupsSchedulesList = () => {
    const router = useRouter();

    const { data: schedulesInfo, isLoading, isError, hasNextPage, fetchNextPage } = useGroupsSchedules(initialParams);

    const { ref: lastElemRef, entry } = useIntersection();

    useEffect(() => {
        if (entry && entry.isIntersecting && hasNextPage) {
            fetchNextPage();
        }
    }, [entry]);

    if (isLoading) {
        return (
            <>
                <Skeleton maw={323} h={40} radius={8} />
                <Skeleton w="100%" h={408} radius={16} />
            </>
        );
    }

    if (isError || !schedulesInfo?.data.length) {
        return null;
    }

    const handleClickScheduleCard = (groupId: number) => router.push({ pathname: "/my-courses/[id]", query: { id: String(groupId) } });

    return (
        <Flex gap={32} direction="column">
            <Heading order={1}>Расписание занятий</Heading>
            <Carousel<GroupSchedulesInfo>
                data={schedulesInfo.data}
                lastElemRef={lastElemRef}
                slideSize={448}
                breakpoints={[{ maxWidth: "xs", slideSize: "100%" }]}>
                {(props) => <Card data={props.data} onClick={handleClickScheduleCard} />}
            </Carousel>
        </Flex>
    );
};

export default GroupsSchedulesList;
