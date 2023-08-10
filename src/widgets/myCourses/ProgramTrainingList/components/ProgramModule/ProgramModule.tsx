import { Flex } from "@mantine/core";
import { useMemo } from "react";
import { GroupModule } from "@entities/group";
import { Heading, Paragraph } from "@shared/ui";
import useStyles from "./ProgramModule.styles";
import { LessonCard } from "../LessonCard";

export interface ProgramModuleProps {
    data: GroupModule;
    numberModule: number;
    groupId: string;
}

const ProgramModule = ({ data, groupId, numberModule }: ProgramModuleProps) => {
    const { classes } = useStyles();

    const renderLessons = useMemo(
        () => data.lessons.map((lesson) => <LessonCard key={lesson.id} data={lesson} moduleName={data.name} groupId={groupId} />),
        [data.lessons]
    );

    return (
        <Flex gap={32}>
            <Flex className={classes.moduleBlockInfo}>
                <Heading order={4} mb={8}>{`Модуль ${numberModule}`}</Heading>
                <Heading order={2} mb={16}>
                    {data.name}
                </Heading>
                <Paragraph variant="small-m" color="gray45">
                    {data.description}
                </Paragraph>
            </Flex>
            <Flex className={classes.lessonsBlockInfo}>{renderLessons}</Flex>
        </Flex>
    );
};

export default ProgramModule;
