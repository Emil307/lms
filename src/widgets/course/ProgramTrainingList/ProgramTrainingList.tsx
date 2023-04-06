import { Box, BoxProps, Flex, Group, Title, Text, Accordion } from "@mantine/core";
import { useMemo, useState } from "react";
import { Minus, Plus } from "react-feather";
import { GetCourseProgramResponse } from "@entities/course";
import { getMonthDifference, getPluralString } from "@shared/utils";
import { ProgramModuleLessonsList } from "@features/courses";

import IconStarFour from "public/icons/starFour.svg";

import useStyles from "./ProgramTrainingList.styles";

export interface ProgramTrainingListProps extends Omit<BoxProps, "children"> {}

//FIXME: Удалить после подключения к энпоинту
const data: GetCourseProgramResponse = {
    moduleCount: 11,
    lessonCount: 32,
    homeworkCount: 24,
    testCount: 12,
    dateStart: "2023-02-01T13:13:11.000000Z",
    dateEnd: "2023-03-03T13:13:11.000000Z",
    modules: {
        data: [
            {
                id: 1,
                name: "moduleName",
                lessonCount: 3,
                practiceCount: 5,
            },
            {
                id: 2,
                name: "moduleName",
                lessonCount: 3,
                practiceCount: 5,
            },
            {
                id: 3,
                name: "moduleName",
                lessonCount: 3,
                practiceCount: 5,
            },
            {
                id: 4,
                name: "moduleName",
                lessonCount: 3,
                practiceCount: 5,
            },
        ],
        meta: {
            pagination: {
                count: 1,
                total: 3,
                per_page: 1,
                current_page: 2,
                total_pages: 3,
                links: {
                    previous: "http =>//0.0.0.0/api/test?name=123&test=123&page=1",
                    next: "http =>//0.0.0.0/api/test?name=123&test=123&page=3",
                },
            },
        },
    },
};

const ProgramTrainingList = (props: ProgramTrainingListProps) => {
    const { classes } = useStyles();
    const [selected, setSelected] = useState<string[]>([]);

    const getChevron = (isOpen: boolean) => {
        if (isOpen) {
            return <Minus />;
        }
        return <Plus />;
    };

    const renderAboutCourse = useMemo(
        () =>
            [
                {
                    label: "Состав",
                    value: `${data.moduleCount} ${getPluralString(data.moduleCount, "модуль", "модуля", "модулей")}, ${
                        data.lessonCount
                    } ${getPluralString(data.moduleCount, "урок", "урока", "уроков")}`,
                },
                {
                    label: "Практических заданий",
                    value: `${data.homeworkCount} ${getPluralString(
                        data.homeworkCount,
                        "домашнее задание",
                        "домашнего задания",
                        "домашних заданий"
                    )}, ${data.testCount} ${getPluralString(data.testCount, "тест", "теста", "тестов")}`,
                },
                {
                    label: "Продолжительность",
                    value:
                        data.dateStart &&
                        data.dateEnd &&
                        `${getMonthDifference(data.dateStart, data.dateEnd)} ${getPluralString(
                            getMonthDifference(data.dateStart, data.dateEnd),
                            "месяц",
                            "месяца",
                            "месяцев"
                        )}`,
                },
            ].map((item, index) => (
                <Flex key={index} direction="column" gap={2}>
                    <Text className={classes.aboutCourseLabel}>{item.label}</Text>
                    <Text className={classes.aboutCourseValue}>{item.value}</Text>
                </Flex>
            )),
        [data.moduleCount, data.lessonCount, data.homeworkCount, data.testCount, data.dateStart, data.dateEnd]
    );

    const renderModules = useMemo(
        () =>
            data.modules.data.map((programModule, index) => {
                const isSelected = selected.includes(`${programModule.name}_${index}`);
                return (
                    <Accordion.Item key={index} value={`${programModule.name}_${index}`} sx={{ marginTop: "16px !important" }}>
                        <Accordion.Control chevron={getChevron(isSelected)}>
                            <Group>
                                <Text>{`Модуль ${index + 1}. ${programModule.name}`}</Text>
                                <Flex gap={6}>
                                    <IconStarFour />
                                    <Text className={classes.countLessons}>{`${programModule.lessonCount} ${getPluralString(
                                        programModule.lessonCount,
                                        "урок",
                                        "урока",
                                        "уроков"
                                    )}`}</Text>
                                </Flex>
                                <Flex gap={6}>
                                    <IconStarFour />
                                    <Text className={classes.countPractice}>{`${programModule.practiceCount} ${getPluralString(
                                        programModule.practiceCount,
                                        "практика",
                                        "практики",
                                        "практик"
                                    )}`}</Text>
                                </Flex>
                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel>{isSelected && <ProgramModuleLessonsList courseId={13} programId={10} />}</Accordion.Panel>
                    </Accordion.Item>
                );
            }),
        [data, selected]
    );

    return (
        <Box {...props} className={classes.root}>
            <Title order={2} color="dark" mb={32}>
                Программа обучения
            </Title>
            <Group className={classes.containerAboutCourse}>
                <Title order={3} color="dark" w={136}>
                    О курсе
                </Title>
                {renderAboutCourse}
            </Group>
            <Accordion {...props} multiple variant="separated" value={selected} onChange={setSelected}>
                {renderModules}
            </Accordion>
        </Box>
    );
};

export default ProgramTrainingList;
