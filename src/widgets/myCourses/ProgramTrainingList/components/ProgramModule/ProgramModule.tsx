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
    groupStartDate: Date;
}

const ProgramModule = ({ data, groupId, groupStartDate, numberModule }: ProgramModuleProps) => {
    const { classes } = useStyles();

    const renderLessons = useMemo(
        () =>
            data.lessons.map((lesson) => (
                <LessonCard key={lesson.id} groupStartDate={groupStartDate} data={lesson} moduleName={data.name} groupId={groupId} />
            )),
        [data.lessons],
    );

    return (
        <Flex className={classes.root}>
            <Flex className={classes.moduleBlockInfo}>
                <Heading order={4} className={classes.moduleNumber}>{`Модуль ${numberModule}`}</Heading>
                <Heading order={2} className={classes.moduleName}>
                    {data.name}
                </Heading>
                <Paragraph variant="small-m" color="neutralMain50">
                    {data.description}
                </Paragraph>
            </Flex>
            <Flex className={classes.lessonsBlockInfo}>{renderLessons}</Flex>
        </Flex>
    );
};

export default ProgramModule;
