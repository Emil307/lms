import { Accordion, Flex } from "@mantine/core";
import React, { memo } from "react";
import { Folder, Minus, Plus } from "react-feather";
import { Heading, Paragraph } from "@shared/ui";
import { CourseModule } from "@entities/course";
import useStyles from "./ProgramModule.styles";
import { ProgramModuleLessonsList } from "../ProgramModuleLessonsList";
import { useMedia } from "@shared/utils";

export interface ProgramModuleProps {
    data: CourseModule;
    numberModule: number;
    isSelected?: boolean;
}

const MemoizedProgramModule = memo(function ProgramModule({ data, numberModule, isSelected }: ProgramModuleProps) {
    const { classes } = useStyles();
    const isTablet = useMedia("md");

    const getChevron = () => {
        if (isSelected) {
            return (
                <Flex className={classes.iconChevronContainer}>
                    <Minus />
                </Flex>
            );
        }
        return (
            <Flex className={classes.iconChevronContainer}>
                <Plus />
            </Flex>
        );
    };

    return (
        <Accordion.Item
            className={classes.accordionItem}
            value={`${data.name}_${data.id}`}
            sx={{ marginTop: isTablet ? 0 : `16px !important` }}>
            <Accordion.Control className={classes.accordionControl} chevron={getChevron()}>
                <Paragraph variant="text-small-m" color="gray45" className={classes.mainTitle}>
                    {`Часть ${numberModule}`}
                </Paragraph>
                <Flex direction="column" gap={16}>
                    <Flex className={classes.accordionControlInner}>
                        <Flex className={classes.iconContainer}>
                            <Folder />
                        </Flex>
                        <Heading order={2} className={classes.title}>{`${data.name}`}</Heading>
                    </Flex>
                    <Paragraph variant="large">{`${data.description}`}</Paragraph>
                </Flex>
            </Accordion.Control>
            <Accordion.Panel className={classes.accordionPanel}>
                <ProgramModuleLessonsList data={data.lessons} />
            </Accordion.Panel>
        </Accordion.Item>
    );
});

export default MemoizedProgramModule;
