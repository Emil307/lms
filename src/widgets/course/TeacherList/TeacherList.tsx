import { Box, BoxProps, Flex, Title, Text, Group, Card as MCard, Badge } from "@mantine/core";
import { useMemo } from "react";
import Image from "next/image";
import { CourseTeacher } from "@entities/course";
import { getPluralString } from "@shared/utils";
import useStyles from "./TeacherList.styles";

export interface TeacherListProps extends Omit<BoxProps, "children"> {}

//FIXME: Удалить после подключения к энпоинту
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

const TeacherList = (props: TeacherListProps) => {
    const { classes } = useStyles();

    const renderTeachers = useMemo(
        () =>
            data.map((teacher) => {
                return (
                    <MCard key={teacher.id} className={classes.card} maw={424}>
                        <MCard.Section className={classes.cardImageSection}>
                            <Box className={classes.imageWrapper}>
                                <Image
                                    src={teacher.profile.avatar.path}
                                    loader={({ src }) => `${src}`}
                                    layout="fill"
                                    objectFit="cover"
                                    alt={teacher.profile.avatar.name}
                                />
                            </Box>
                            <Group className={classes.cardSectionContent}>
                                <Badge variant="outline" className={classes.countCourse}>
                                    {`${teacher.courseCount} ${getPluralString(teacher.courseCount, "курс", "курса", "курсов")}`}
                                </Badge>
                            </Group>
                        </MCard.Section>
                        <MCard.Section className={classes.cardContentBody}>
                            <Title order={3} color="dark" lineClamp={2}>
                                {`${teacher.profile.firstName} ${teacher.profile.lastName}`}
                            </Title>
                            <Text className={classes.userDescription} lineClamp={5}>
                                {teacher.profile.description}
                            </Text>
                        </MCard.Section>
                    </MCard>
                );
            }),
        [data]
    );
    return (
        <Box {...props}>
            <Flex direction="column" gap={8} mb={32}>
                <Title order={2} color="dark">
                    Наставники помогают найти ответы
                </Title>
                <Text className={classes.userDescription}>
                    Опытные руководители разбирают случаи из вашей рабочей практики и дают обратную связь.
                </Text>
            </Flex>
            <Group sx={{ gap: 24 }}>{renderTeachers}</Group>
        </Box>
    );
};

export default TeacherList;
