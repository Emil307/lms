import { Box, BoxProps, Flex, Title, Group, TitleProps } from "@mantine/core";
import { CourseTeacher } from "@entities/course";
import { Carousel } from "@components/Carousel";
import { TeacherCard as CourseTeacherCard } from "@features/courses";

export interface TeacherCarouselListProps extends Omit<BoxProps, "children"> {
    titleProps?: TitleProps;
}

//TODO: Удалить после подключения к энпоинту
const data: CourseTeacher[] = [
    {
        id: 1,
        email: "administrator@addamant.ru",
        isActive: true,
        isStatic: false,
        courseCount: 15,
        profile: {
            id: 1,
            firstName: "Eryn",
            lastName: "Virginie",
            patronymic: "Buckridge",
            description:
                "Руководитель лаборатории новых цифровых продуктов, технологический скаут в Лаборатории Касперского и ментор стартапов в фонде Сколково. Опыт руководства — больше 15 лет. Управляет командами от 2 до 60 человек.",
            avatar: {
                name: "fileName.jpg",
                path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
                type: "image/jpg",
                size: 12311,
            },
        },
    },
    {
        id: 2,
        email: "collins.cary@example.org",
        isActive: true,
        isStatic: false,
        courseCount: 2,
        profile: {
            id: 2,
            firstName: "Anna",
            lastName: "Deanna",
            patronymic: "Kuphal",
            description:
                "Chief Product Officer в Cake bank — самом большом диджитал-банке Вьетнама. В управлении уже 8 лет: в прошлом — директор по развитию продуктов в CloudPayments. Управляет командами от 5 до 100 человек.",
            avatar: {
                name: "fileName.jpg",
                path: "https://blog.ecotone.tech/content/images/size/w2000/2022/01/iStock-868962070--1-.jpg",
                type: "image/jpg",
                size: 12311,
            },
        },
    },
];

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
