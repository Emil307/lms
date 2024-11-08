import { Badge, Box, Flex, Text } from "@mantine/core";
import React, { useState } from "react";
import { EmptyData, Heading, Loader } from "@shared/ui";
import { GetLessonResponse, useTest, useTestPass } from "@entities/lesson";
import { UpdateLessonTestPassForm } from "@features/lessons";
import IconEmptyBox from "@public/icons/emptyBox.svg";
import useStyles from "./Test.styles";
import { PassedTestInfo } from "./components";

export interface TestProps {
    lesson: GetLessonResponse;
    courseId: string;
    groupId: string;
}

const Test = ({ lesson, courseId, groupId }: TestProps) => {
    const lessonId = String(lesson.id);

    const [isTestAgain, setIsTestAgain] = useState(false);
    const { data: testData, isFetching: isFetchingTest, isError: isErrorTest } = useTest({ lessonId, groupId });
    const { data: testPassData, isFetching: isFetchingTestPass, isError: isErrorTestPass } = useTestPass({ lessonId, groupId }, !!testData);

    const { classes } = useStyles({ status: testPassData?.status.name });

    const handleCloseUpdateTestPassForm = () => setIsTestAgain(false);
    const handleOpenUpdateTestPassForm = () => setIsTestAgain(true);

    const renderContent = () => {
        if (isFetchingTest || isFetchingTestPass) {
            return <Loader />;
        }

        if (isErrorTest || isErrorTestPass) {
            return <Text>Произошла ошибка, попробуйте позднее</Text>;
        }

        if (!testData) {
            return <EmptyData title="Тест отсутствует" description="" icon={<IconEmptyBox />} />;
        }

        if (testPassData && !isTestAgain) {
            return (
                <Box className={classes.contentContainer}>
                    <PassedTestInfo data={testPassData} openUpdateTestPassForm={handleOpenUpdateTestPassForm} />
                </Box>
            );
        }

        return (
            <Box className={classes.contentContainer}>
                <UpdateLessonTestPassForm
                    testData={testData}
                    testPassData={testPassData}
                    lessonId={lessonId}
                    courseId={courseId}
                    groupId={groupId}
                    onClose={handleCloseUpdateTestPassForm}
                    readOnly={lesson.lessonStatus.name !== "inProgress"}
                />
            </Box>
        );
    };

    return (
        <Flex className={classes.root}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>Тест</Heading>
                {testPassData && <Badge className={classes.status}>{testPassData.status.displayName}</Badge>}
            </Flex>
            {renderContent()}
        </Flex>
    );
};

export default Test;
