import { Box, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { CreateCoursePackageForm } from "@features/coursePackages";
import { breadCrumbsItems } from "./constants";

const CreateCoursePackagePage = () => {
    const router = useRouter();

    const handleCloseForm = () => router.push("/admin/settings/course-packages");

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Title order={1} color="dark">
                Создать пакет
            </Title>
            <CreateCoursePackageForm onClose={handleCloseForm} />
        </Box>
    );
};

export default CreateCoursePackagePage;
