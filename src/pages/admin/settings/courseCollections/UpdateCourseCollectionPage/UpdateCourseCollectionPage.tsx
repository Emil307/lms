import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import { TRouterQueries } from "@shared/types";
import { useAdminCourseCollection } from "@entities/courseCollection";
import { UpdateCourseCollectionForm } from "@features/courseCollections";
import { getBreadCrumbsItems } from "./utils";

const UpdateCourseCollectionPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;

    const { data: courseCollectionData, isLoading, isError } = useAdminCourseCollection({ id });

    const handleCancel = () => router.push({ pathname: "/admin/settings/course-collections/[id]", query: { id } });

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ name: courseCollectionData.name, id })} mb={8} />
            <Heading mb={24}>{courseCollectionData.name}</Heading>
            <UpdateCourseCollectionForm data={courseCollectionData} onClose={handleCancel} />
        </Box>
    );
};

export default UpdateCourseCollectionPage;
