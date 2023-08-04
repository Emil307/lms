import { Accordion, Flex, Group } from "@mantine/core";
import { memo } from "react";
import { Minus, Plus } from "react-feather";
import { Heading, Paragraph } from "@shared/ui";
import IconStarFour from "public/icons/starFour.svg";
import { CourseModule } from "@entities/course";
import { getPluralString } from "@shared/utils";
import { ProgramModuleLessonsList } from "../ProgramModuleLessonsList";

export interface ProgramModuleProps {
    data: CourseModule;
    numberModule: number;
    isSelected?: boolean;
}

const MemoizedProgramModule = memo(function ProgramModule({ data, numberModule, isSelected }: ProgramModuleProps) {
    const getChevron = () => {
        if (isSelected) {
            return <Minus />;
        }
        return <Plus />;
    };

    return (
        <Accordion.Item value={`${data.name}_${data.id}`} sx={{ marginTop: "16px !important" }}>
            <Accordion.Control chevron={getChevron()}>
                <Group>
                    <Heading order={3}>{`Модуль ${numberModule}. ${data.name}`}</Heading>
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
                        <Paragraph variant="text-small-m">{`${data.lessonHomeworksCount} ${getPluralString(
                            data.lessonHomeworksCount,
                            "практика",
                            "практики",
                            "практик"
                        )}`}</Paragraph>
                    </Flex>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                <ProgramModuleLessonsList data={data.lessons} />
            </Accordion.Panel>
        </Accordion.Item>
    );
});

export default MemoizedProgramModule;
