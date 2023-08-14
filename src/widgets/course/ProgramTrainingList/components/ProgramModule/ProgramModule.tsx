import { Accordion, Flex } from "@mantine/core";
import { memo } from "react";
import { Minus, Plus } from "react-feather";
import { Heading, Paragraph } from "@shared/ui";
import IconStarFour from "public/icons/starFour.svg";
import { CourseModule } from "@entities/course";
import { getPluralString } from "@shared/utils";
import useStyles from "./ProgramModule.styles";
import { ProgramModuleLessonsList } from "../ProgramModuleLessonsList";

export interface ProgramModuleProps {
    data: CourseModule;
    numberModule: number;
    isSelected?: boolean;
}

const MemoizedProgramModule = memo(function ProgramModule({ data, numberModule, isSelected }: ProgramModuleProps) {
    const { classes } = useStyles();

    const getChevron = () => {
        if (isSelected) {
            return <Minus />;
        }
        return <Plus />;
    };

    return (
        <Accordion.Item value={`${data.name}_${data.id}`} sx={{ marginTop: "16px !important" }}>
            <Accordion.Control className={classes.accordionControl} chevron={getChevron()}>
                <Flex className={classes.accordionControlInner}>
                    <Heading order={3}>{`Модуль ${numberModule}. ${data.name}`}</Heading>
                    <Flex align="center" gap={16}>
                        <Flex align="center" gap={6}>
                            <IconStarFour />
                            <Paragraph variant="text-small-m">{`${data.lessonsCount} ${getPluralString(
                                data.lessonsCount,
                                "урок",
                                "урока",
                                "уроков"
                            )}`}</Paragraph>
                        </Flex>
                        <Flex align="center" gap={6}>
                            <IconStarFour />
                            <Paragraph variant="text-small-m">{`${data.homeworksCount} ${getPluralString(
                                data.homeworksCount,
                                "практика",
                                "практики",
                                "практик"
                            )}`}</Paragraph>
                        </Flex>
                    </Flex>
                </Flex>
            </Accordion.Control>
            <Accordion.Panel className={classes.accordionPanel}>
                <ProgramModuleLessonsList data={data.lessons} />
            </Accordion.Panel>
        </Accordion.Item>
    );
});

export default MemoizedProgramModule;
