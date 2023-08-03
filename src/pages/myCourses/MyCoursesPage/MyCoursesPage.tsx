import { Box, ThemeIcon, Flex } from "@mantine/core";
import React from "react";
import { Folder, Heart } from "react-feather";
import { useRouter } from "next/router";
import { BreadCrumbs, Button, Heading, Tabs } from "@shared/ui";
import { List as GroupList } from "@features/groups";
import { TRouterQueries } from "@shared/types";
import { useGroupsCounts } from "@entities/group";
import { breadCrumbsItems } from "./constants";
import { getSortedTabList, getTabList } from "./utils";

const MyCoursesPage = () => {
    const router = useRouter();
    const { tab } = router.query as TRouterQueries;

    const countsGroups = useGroupsCounts();

    const tabsList = getSortedTabList(getTabList({ data: countsGroups.data }));

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/my-courses", query: { tab: value } });
    };

    const handleOpenFavoriteCourses = () => router.push("/my-courses/favorite");

    const handleOpenMyCoursesDetails = (id: unknown) => router.push({ pathname: "/my-courses/[id]", query: { id: String(id) } });

    return (
        <Box>
            <Flex justify="space-between" gap={24} mb={32}>
                <Box>
                    <BreadCrumbs items={breadCrumbsItems} mb={8} />
                    <Flex align="center" gap={12}>
                        <ThemeIcon color="primaryHover">
                            <Folder />
                        </ThemeIcon>
                        <Heading>Мои курсы</Heading>
                    </Flex>
                </Box>
                <Button variant="border" leftIcon={<Heart />} onClick={handleOpenFavoriteCourses}>
                    Избранные курсы
                </Button>
            </Flex>
            {!!tabsList.length && <Tabs tabs={tabsList} value={tab || tabsList[0].value} onTabChange={handleChangeTab} mb={32} />}
            <GroupList perPage={9} withPagination onClick={handleOpenMyCoursesDetails} />
        </Box>
    );
};

export default MyCoursesPage;
