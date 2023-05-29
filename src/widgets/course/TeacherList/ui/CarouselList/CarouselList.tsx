import { Box, BoxProps, Flex, Title, Group, TitleProps } from "@mantine/core";
import { CourseTeacher } from "@entities/course";
import { Carousel } from "@components/Carousel";
import { TeacherCard as CourseTeacherCard } from "@features/courses";

export interface TeacherCarouselListProps extends Omit<BoxProps, "children"> {
    titleProps?: TitleProps;
}

//TODO: Удалить после подключения к энпоинту
const data: CourseTeacher[] = [];

const TeacherCarouselList = ({ titleProps, ...props }: TeacherCarouselListProps) => {
    return (
        <Box {...props}>
            <Flex direction="column" gap={8} mb={32}>
                <Title order={2} color="dark" {...titleProps}>
                    Наставники помогают найти ответы
                </Title>
            </Flex>
            <Group sx={{ gap: 24 }}>
                <Carousel<CourseTeacher> data={data} slideSize={424}>
                    {(props) => <CourseTeacherCard {...props} mah={420} w={424} />}
                </Carousel>
            </Group>
        </Box>
    );
};

export default TeacherCarouselList;
