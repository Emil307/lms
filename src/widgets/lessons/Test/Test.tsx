import { Badge, Box, Flex } from "@mantine/core";
import { useState } from "react";
import { Heading, Loader } from "@shared/ui";
import { useTestPass } from "@entities/lesson";
import { UpdateLessonTestPassForm } from "@features/lessons";
import useStyles from "./Test.styles";
import { PassedTestInfo } from "./components";

export interface TestProps {
    lessonId: string;
    courseId: string;
}

const Test = ({ lessonId, courseId }: TestProps) => {
    const [isTestAgain, setIsTestAgain] = useState(false);
    const { data: testPassData, isLoading } = useTestPass({ lessonId, courseId });

    const { classes } = useStyles({ status: testPassData?.status.name });

    const handleCloseUpdateTestPassForm = () => setIsTestAgain(false);
    const handleOpenUpdateTestPassForm = () => setIsTestAgain(true);

    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }

        if (testPassData && !isTestAgain) {
            return <PassedTestInfo data={testPassData} openUpdateTestPassForm={handleOpenUpdateTestPassForm} />;
        }

        return (
            <UpdateLessonTestPassForm data={testPassData} lessonId={lessonId} courseId={courseId} onClose={handleCloseUpdateTestPassForm} />
        );
    };

    return (
        <Flex className={classes.root}>
            <Flex gap={16}>
                <Heading order={2}>Тест</Heading>
                {testPassData && <Badge className={classes.status}>{testPassData.status.displayName}</Badge>}
            </Flex>
            <Box className={classes.contentContaner}>{renderContent()}</Box>
        </Flex>
    );
};

export default Test;
