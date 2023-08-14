import { Box, ThemeIcon, Flex } from "@mantine/core";
import React from "react";
import { Folder } from "react-feather";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Tabs } from "@shared/ui";
import { List as GroupList } from "@features/groups";
import { TRouterQueries } from "@shared/types";
import { useGroupsCounts } from "@entities/group";
import { breadCrumbsItems } from "./constants";
import { getSortedTabList, getTabList } from "./utils";
import useStyles from "./MyCoursesPage.styles";
import { FavoriteRedirectButton } from "./components";

const MyCoursesPage = () => {
    const router = useRouter();
    const { tab } = router.query as TRouterQueries;

    const { classes } = useStyles();

    const countsGroups = useGroupsCounts();

    const tabsList = getSortedTabList(getTabList({ data: countsGroups.data }));

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/my-courses", query: { tab: value } });
    };

    const handleOpenMyCoursesDetails = (id: unknown) => router.push({ pathname: "/my-courses/[id]", query: { id: String(id) } });

    return (
        <Box>
            <Flex className={classes.heading}>
                <Box>
                    <BreadCrumbs items={breadCrumbsItems} mb={8} />
                    <Flex align="center" gap={12}>
                        <ThemeIcon color="primaryHover">
                            <Folder />
                        </ThemeIcon>
                        <Heading>Мои курсы</Heading>
                    </Flex>
                </Box>
                <FavoriteRedirectButton />
            </Flex>
            {!!tabsList.length && <Tabs tabs={tabsList} value={tab || tabsList[0].value} onTabChange={handleChangeTab} mb={32} />}
            <GroupList perPage={9} withPagination onClick={handleOpenMyCoursesDetails} />
        </Box>
    );
};

export default MyCoursesPage;
