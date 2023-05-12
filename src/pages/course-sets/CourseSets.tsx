import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { CourseSet, useCourseSets } from "@entities/courseSet";
import { CourseSetCard } from "@features/course-set";
import { List } from "@components/List";

const CourseSetsPage = () => {
    const router = useRouter();
    const page = router.query.page || 1;

    const { data: courseSetsData, isFetching } = useCourseSets({ page: Number(page) });

    const titlePage = `Топовые подборки курсов ${new Date().getFullYear()}`;

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/" } },
        { title: "Курсы", href: { pathname: "/" } },
        { title: titlePage, href: { pathname: "/course-sets" } },
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark">
                    {titlePage}
                </Title>
            </Box>
            <List<CourseSet>
                data={courseSetsData?.data}
                renderItem={(props) => <CourseSetCard {...props} />}
                withPagination
                pagination={courseSetsData?.pagination}
                isLoading={isFetching}
            />
        </Box>
    );
};

export default CourseSetsPage;
