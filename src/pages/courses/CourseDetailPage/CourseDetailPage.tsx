//TODO: Вернуть как вернемся к курсам ЛК https://addamant.planfix.ru/task/94326
// import { Flex, Group, Title } from "@mantine/core";
// import React from "react";
// import { useRouter } from "next/router";
// import { Edit } from "react-feather";
// import { BreadCrumbs, Button } from "@shared/ui";
// import { AuthorInfo, MainInfoPanel, ProgramTrainingList } from "@widgets/course";
// import { useCourse } from "@entities/course";
// import { CarouselList as CoursePackageCarouselList } from "@widgets/coursePackage";
// import { TRouterQueries } from "@shared/types";
// import { CarouselList as CourseReviewCarouselList } from "@features/courseReviews";
// import { getBreadCrumbsItems } from "./utils";

const CourseDetailPage = () => {
    // const router = useRouter();
    // const { id } = router.query as TRouterQueries;

    return null;

    //TODO: Вернуть как вернемся к курсам ЛК https://addamant.planfix.ru/task/94326
    // const { data: courseData } = useCourse({ id });

    // return (
    //     <Flex direction="column" gap={32}>
    //         <BreadCrumbs items={getBreadCrumbsItems({ courseName: courseData?.name, id })} />
    //         <Flex direction="column" gap={64}>
    //             <Flex direction="column" gap={16}>
    //                 <MainInfoPanel data={courseData} />
    //                 <AuthorInfo data={courseData} />
    //             </Flex>
    //             <ProgramTrainingList />
    //             <CoursePackageCarouselList
    //                 title={`Курс «${courseData?.name}» содержится в пакетах`}
    //                 description="Выберите дополнительный курс по более выгодной цене."
    //             />
    //             {/* //TODO: тут нужно передавать курсИД чтобы получать отзывы определеноого курса */}
    //             <CourseReviewCarouselList
    //                 headerSlot={
    //                     <Group sx={{ justifyContent: "space-between", marginBottom: 32 }}>
    //                         <Group sx={{ columnGap: 24 }}>
    //                             <Title order={2} color="dark">
    //                                 Отзывы студентов
    //                             </Title>
    //                             {/* //TODO: Добавить как бекенд отдаст инфу о среднем рейтинге курса */}
    //                             {/* <Flex align="flex-end" gap={16}>
    //                                 <Flex gap={4}>
    //                                     <Flex align="center" gap={2}>
    //                                         <Rating defaultValue={1} count={1} readOnly size="small" />
    //                                         <Text className={classes.ratingValue}>{data.averageRating}</Text>
    //                                     </Flex>
    //                                     <Text className={classes.ratingMaxValue}>из 5</Text>
    //                                 </Flex>
    //                                 <Text className={classes.reviewInfo}>{`${data.reviewCount} ${getPluralString(
    //                                     data.averageRating,
    //                                     "отзыв",
    //                                     "отзыва",
    //                                     "отзывов"
    //                                 )}`}</Text>
    //                             </Flex> */}
    //                         </Group>
    //                         {/* //TODO: Добавить открытие модалки для написания отзыва */}
    //                         <Button variant="text" leftIcon={<Edit />}>
    //                             Написать отзыв
    //                         </Button>
    //                     </Group>
    //                 }
    //             />
    //         </Flex>
    //     </Flex>
    // );
};

export default CourseDetailPage;
