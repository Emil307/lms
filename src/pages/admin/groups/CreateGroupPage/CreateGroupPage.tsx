import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { CreateAdminGroupForm } from "@features/groups";
import { CreateAdminGroupResponse } from "@entities/group";
import { breadCrumbsItems } from "./constants";
import { TRequestParams } from "./types";

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
            <Heading mb={24}>Создание группы</Heading>
            <CreateAdminGroupForm courseId={courseId} onSuccess={handleSuccessForm} onCancel={handleCancelForm} maw={512} />
        </Box>
    );
};

export default CreateGroupPage;
