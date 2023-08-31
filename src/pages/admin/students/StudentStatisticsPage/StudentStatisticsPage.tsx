import { Box, Text } from "@mantine/core";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import React from "react";
import { useAdminGroupStudentStatistics } from "@entities/group";
import { useRouter } from "next/router";
import { getFullName } from "@shared/utils";
import { StudentStatistics } from "@features/students";
import { TRouterQueriesParams } from "./types";
import { getBreadCrumbsItems } from "./utils";

const StudentStatisticsPage = () => {
    const router = useRouter();
    const { id, groupId } = router.query as TRouterQueriesParams;

    const { data, isLoading, isError } = useAdminGroupStudentStatistics({ groupId, studentId: id });

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
                    groupId,
                    groupName: data.group.name,
                    studentId: id,
                    studentFullName,
                })}
                mb={8}
            />
            <Heading mb={32}>{data.group.name}</Heading>
            <StudentStatistics data={data} />
        </Box>
    );
};

export default StudentStatisticsPage;
