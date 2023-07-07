import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { CreateAdminGroupForm } from "@features/groups";
import { breadCrumbsItems } from "./constants";
import { TRequestParams } from "./types";
import { CreateAdminGroupResponse } from "@entities/group";

const CreateGroupPage = () => {
    const router = useRouter();
    const { courseId } = router.query as TRequestParams;

    const handleCancelForm = () => {
        if (courseId) {
            return router.push({ pathname: "/admin/courses/[id]", query: { id: courseId, tab: "groups" } });
        }
        router.push("/admin/groups");
    };

    const handleSuccessForm = (newGroup: CreateAdminGroupResponse) => {
        if (courseId) {
            return router.push({ pathname: "/admin/courses/[id]", query: { id: courseId, tab: "groups" } });
        }
        router.push({ pathname: "/admin/groups/[id]", query: { id: String(newGroup.id) } });
    };

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark" mb={24}>
                Создание группы
            </Title>
            <CreateAdminGroupForm courseId={courseId} onSuccess={handleSuccessForm} onCancel={handleCancelForm} maw={512} />
        </Box>
    );
};

export default CreateGroupPage;
