import { Box, BoxProps, Flex, Title, Text, Group } from "@mantine/core";
import { useMemo } from "react";
import { CourseTeacher } from "@entities/course";
import { TeacherCard as CourseTeacherCard } from "@features/courses";
import useStyles from "./TeacherList.styles";

export interface TeacherListProps extends Omit<BoxProps, "children"> {}

//TODO: Удалить после подключения к энпоинту
const data: CourseTeacher[] = [];

const TeacherList = (props: TeacherListProps) => {
    const { classes } = useStyles();

    const renderTeachers = useMemo(() => data.map((teacher) => <CourseTeacherCard key={teacher.id} data={teacher} />), [data]);
    return (
        <Box {...props}>
            <Flex direction="column" gap={8} mb={32}>
                <Title order={2} color="dark">
                    Наставники помогают найти ответы
                </Title>
                <Text className={classes.headingDescription}>
                    Опытные руководители разбирают случаи из вашей рабочей практики и дают обратную связь.
                </Text>
            </Flex>
            <Group sx={{ gap: 24 }}>{renderTeachers}</Group>
        </Box>
    );
};

export default TeacherList;
