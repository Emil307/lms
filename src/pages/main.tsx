import { Flex, Title } from "@mantine/core";
import React from "react";
import { Folder } from "react-feather";
import { List } from "@components/List";
import { Card as CourseCard } from "@features/courses";
import { Course } from "@entities/course";
import { CourseTeacherCarouselList, StudentReviews } from "@widgets/course";
import { CarouselList as CoursePackageCarouselList } from "@widgets/coursePackage";
import { AccordionList as FaqAccordionList } from "@features/faq";
import { Button } from "@shared/ui";

import { List as CourseSetList } from "@features/courseSets";

const MainPage = () => {
    const titleCourseSets = `Топовые подборки курсов ${new Date().getFullYear()}`;

    return (
        <Flex direction="column" gap={64}>
            <Flex direction="column" gap={32}>
                <Title order={1} color="dark">
                    {titleCourseSets}
                </Title>
                <CourseSetList hasCardMore perPage={2} />
            </Flex>
            <Flex direction="column" gap={32}>
                <Title order={1} color="dark">
                    Популярные курсы
                </Title>
                {/* //TODO: Заменить на feature список */}
                <List<Course> data={[]} renderItem={(props) => <CourseCard {...props} />} colProps={{ lg: 4, md: 4, sm: 6 }} />
                <Button variant="white" leftIcon={<Folder />} w="min-content" mx="auto">
                    Смотреть все курсы
                </Button>
            </Flex>
            <StudentReviews titleProps={{ order: 1 }} />
            <CoursePackageCarouselList title="Пакетные предложения" titleProps={{ order: 1 }} />
            <CourseTeacherCarouselList titleProps={{ order: 1 }} />
            <Flex direction="column" gap={32}>
                <Title order={1} color="dark">
                    Вопрос-ответ
                </Title>
                <FaqAccordionList />
                {/* //TODO: Пока закомментировали */}
                {/* <Button variant="white" leftIcon={<IconComment />} w="min-content" mx="auto">
                    Задать свой вопрос
                </Button> */}
            </Flex>
        </Flex>
    );
};

export default MainPage;
