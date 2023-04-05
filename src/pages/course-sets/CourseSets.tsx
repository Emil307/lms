import { Box, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { CourseSet, useCourseSets } from "@entities/courseSet";
import { CourseSetCard } from "@features/course-set";
import { List } from "@components/List";
import { Pagination } from "@shared/types";

const initialPagination = {
    count: 0,
    current_page: 1,
    links: {},
    per_page: 1,
    total: 0,
    total_pages: 0,
};

const CourseSetsPage = () => {
    const router = useRouter();
    const page = router.query.page || 1;

    const [pagination, setPagination] = useState<Pagination>(initialPagination);
    const { data: courseSetsData, isFetching } = useCourseSets({ page: Number(page) });

    const titlePage = `Топовые подборки курсов ${new Date().getFullYear()}`;

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/" } },
        { title: "Курсы", href: { pathname: "/" } },
        { title: titlePage, href: { pathname: "/course-sets" } },
    ];

    useEffect(() => {
        router.push({ pathname: router.pathname, query: { page: pagination.current_page.toString() } }, undefined, { shallow: true });
    }, [pagination]);

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
                pagination={courseSetsData?.meta.pagination}
                onPaginationChange={setPagination}
                isLoading={isFetching}
            />
        </Box>
    );
};

export default CourseSetsPage;
