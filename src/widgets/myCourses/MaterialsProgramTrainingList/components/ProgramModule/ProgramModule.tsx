import { Flex } from "@mantine/core";
import { useMemo } from "react";
import { GroupModule } from "@entities/group";
import { Heading } from "@shared/ui";
import useStyles from "./ProgramModule.styles";
import { LessonCard } from "../LessonCard";

export interface ProgramModuleProps {
    data: GroupModule;
    numberModule: number;
}

const ProgramModule = ({ data, numberModule }: ProgramModuleProps) => {
    const { classes } = useStyles();

    const renderLessons = useMemo(
        () => data.lessons.map((lesson) => <LessonCard key={lesson.id} data={lesson} moduleName={data.name} />),
        [data.lessons]
    );

    return (
        <Flex className={classes.root}>
            <Heading order={2} mb={8}>{`Модуль ${numberModule}: ${data.name}`}</Heading>
            <Flex className={classes.content}>{renderLessons}</Flex>
        </Flex>
    );
};

export default ProgramModule;
