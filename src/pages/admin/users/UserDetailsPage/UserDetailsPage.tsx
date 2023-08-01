import { Box, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader, Tabs } from "@shared/ui";
import { InfoPanel, UserSettings } from "@widgets/admin/users";
import { useDetailsUser } from "@entities/user";
import { TRouterQueries } from "@shared/types";
import { Roles } from "@app/routes";
import { getBreadCrumbsItems } from "./utils";
import { tabsList } from "./constants";
import { TeacherCourseList } from "@widgets/admin/courses";
import { TeacherGroupList } from "@widgets/admin/groups";

const UserDetailsPage = () => {
    const router = useRouter();
    const { id, tab } = router.query as TRouterQueries;
    const { data, isLoading, isError } = useDetailsUser(id);

    const handleChangeTab = (value: string) => {
        router.push({ pathname: "/admin/users/[id]", query: { id, tab: value } });
    };

    const currentTab = useMemo(() => {
        if (!router.isReady) {
            return "";
        }
        const currentTab = tabsList.find((tabItem) => tabItem.value === tab);
        return currentTab?.value || tabsList[0].value;
    }, [router.isReady, tab]);

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    const renderComponent = () => {
        if (Roles.teacher !== data.roles[0].id) {
            return <UserSettings id={id} />;
        }
        switch (currentTab) {
            case "settings":
                return <UserSettings id={id} />;
            case "courses":
                return <TeacherCourseList id={id} />;
            case "groups":
                return <TeacherGroupList id={id} />;
            default:
                return <UserSettings id={id} />;
        }
    };

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ data })} />
            <InfoPanel id={id} />
            {Roles.teacher === data.roles[0].id && (
                <Tabs tabs={tabsList} value={currentTab} onTabChange={handleChangeTab} my={32} maw={1162} />
            )}
            {renderComponent()}
        </Box>
    );
};

export default UserDetailsPage;
