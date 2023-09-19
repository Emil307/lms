import { Box, Flex, ActionIcon, Collapse } from "@mantine/core";
import { ChevronDown as ChevronDownIcon } from "react-feather";
import React, { useState } from "react";
import { Heading } from "@shared/ui";
import { AdminGroupModuleForStudentStatistics } from "@entities/group";
import useStyles from "./Module.styles";
import { Lesson } from "../Lesson";

interface ModuleProps {
    data: AdminGroupModuleForStudentStatistics;
    moduleNumber: number;
}

const Module = ({ data, moduleNumber }: ModuleProps) => {
    const { classes } = useStyles();

    const [isOpened, setOpened] = useState(true);

    const handleToggleOpenedInfo = () => setOpened(!isOpened);

    return (
        <Box className={classes.wrapper}>
            <Flex className={classes.heading} onClick={handleToggleOpenedInfo}>
                <Heading order={4}>Модуль {moduleNumber}</Heading>
                <Flex className={classes.headingRight}>
                    <Heading order={4}>{data.completedPercent}%</Heading>
                    <ActionIcon
                        color="dark"
                        miw={24}
                        mih={24}
                        w={24}
                        h={24}
                        onClick={handleToggleOpenedInfo}
                        sx={{ transform: `rotate(${isOpened ? 180 : 0}deg)` }}>
                        <ChevronDownIcon />
                    </ActionIcon>
                </Flex>
            </Flex>
            <Collapse in={isOpened}>
                <Flex gap={2} direction="column">
                    {data.lessons.map((lesson, index) => (
                        <Lesson data={lesson} lessonNumber={index + 1} key={lesson.id} />
                    ))}
                </Flex>
            </Collapse>
        </Box>
    );
};

export default Module;
