import { Box, Title, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader } from "@shared/ui";
import { UpdateCoursePackageForm } from "@features/coursePackages";
import { useAdminCoursePackage } from "@entities/coursePackage";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";

const UpdateCoursePackagePage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data, isLoading, isError } = useAdminCoursePackage(id);

    const handleCloseForm = () => router.push({ pathname: "/admin/settings/course-packages/[id]", query: { id } });

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ coursePackageName: data.name, id })} mb={8} />
            <Title order={1} color="dark">
                {data.name}
            </Title>
            <UpdateCoursePackageForm data={data} onClose={handleCloseForm} />
        </Box>
    );
};

export default UpdateCoursePackagePage;
