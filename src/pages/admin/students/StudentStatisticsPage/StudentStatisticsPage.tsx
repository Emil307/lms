import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import { useAdminGroupStudentStatistics } from "@entities/group";
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
                    courseName: data.course.name,
                    studentId: id,
                    studentFullName,
                })}
                mb={8}
            />
            <Heading mb={32}>{data.course.name}</Heading>
            <StudentStatistics data={data} />
        </Box>
    );
};

export default StudentStatisticsPage;
