import { Box, Flex, Text } from "@mantine/core";
import { BreadCrumbs, Heading, Loader, Paragraph } from "@shared/ui";
import React from "react";
import { useAdminGroupStudentStatistics } from "@entities/group";
import { useRouter } from "next/router";
import { TRouterQueriesParams } from "./types";
import { getBreadCrumbsItems } from "./utils";
import { getFullName } from "@shared/utils";
import { StudentStatistics } from "@features/students";

const GroupStudentStatisticsPage = () => {
    const router = useRouter();
    const { id, studentId } = router.query as TRouterQueriesParams;

    const { data, isLoading, isError } = useAdminGroupStudentStatistics({ groupId: id, studentId });

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const studentFullName = getFullName({ data: data.profile, hidePatronymic: true, startWithLastName: true });

    return (
        <Box>
            <BreadCrumbs
                items={getBreadCrumbsItems({
                    groupId: id,
                    groupName: data.group.name,
                    studentId,
                    studentFullName,
                })}
                mb={8}
            />
            <Heading mb={24}>{studentFullName}</Heading>
            <Flex gap={8} wrap="wrap" mb={32}>
                <Paragraph variant="text-small-m" color="neutral_gray">
                    Учебный курс:
                </Paragraph>
                <Paragraph variant="text-small-m">{data.course.name}</Paragraph>
            </Flex>
            <StudentStatistics data={data} />
        </Box>
    );
};

export default GroupStudentStatisticsPage;
