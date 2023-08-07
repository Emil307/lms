import { Flex } from "@mantine/core";
import React from "react";
import { GreetingCard } from "@features/users";
import { RecommendCourseListFromCollection } from "@widgets/courseCollections";
import { ActiveCourseList } from "@widgets/course";
import { GroupsSchedulesList } from "@widgets/groups";

const CabinetPage = () => {
    return (
        <Flex gap={48} direction="column">
            <GreetingCard />
            <ActiveCourseList />
            <GroupsSchedulesList />
            <RecommendCourseListFromCollection />
        </Flex>
    );
};

export default CabinetPage;
