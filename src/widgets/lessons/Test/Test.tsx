import { Badge, Box, Flex, Text } from "@mantine/core";
import React, { useState } from "react";
import { EmptyData, Heading, Loader } from "@shared/ui";
import { useTest, useTestPass } from "@entities/lesson";
import { UpdateLessonTestPassForm } from "@features/lessons";
import useStyles from "./Test.styles";
import { PassedTestInfo } from "./components";
import IconEmptyBox from "@public/icons/emptyBox.svg";

export interface TestProps {
    lessonId: string;
    courseId: string;
}

const Test = ({ lessonId, courseId }: TestProps) => {
    const [isTestAgain, setIsTestAgain] = useState(false);
    const { data: testData, isFetching: isFetchingTest, isError: isErrorTest } = useTest({ lessonId, courseId });
    const {
        data: testPassData,
        isFetching: isFetchingTestPass,
        isError: isErrorTestPass,
    } = useTestPass({ lessonId, courseId }, !!testData);

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
                    onClose={handleCloseUpdateTestPassForm}
                />
            </Box>
        );
    };

    return (
        <Flex className={classes.root}>
            <Flex gap={16}>
                <Heading order={2}>Тест</Heading>
                {testPassData && <Badge className={classes.status}>{testPassData.status.displayName}</Badge>}
            </Flex>
            {renderContent()}
        </Flex>
    );
};

export default Test;
