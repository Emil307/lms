import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading } from "@shared/ui";
import { CreateCourseCollectionForm } from "@features/courseCollections";
import { breadCrumbsItems } from "./constants";

const CreateCourseCollectionPage = () => {
    const router = useRouter();

    const onCloseCreateForm = () => router.push({ pathname: "/admin/settings/course-collections" });

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={8} />
            <Heading mb={24}>Создание подборки</Heading>
            <CreateCourseCollectionForm onClose={onCloseCreateForm} />
        </Box>
    );
};

export default CreateCourseCollectionPage;
