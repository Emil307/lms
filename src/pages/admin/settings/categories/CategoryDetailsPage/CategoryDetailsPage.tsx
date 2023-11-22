import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader } from "@shared/ui";
import { useAdminCategory } from "@entities/category";
import { InfoPanel } from "@widgets/admin/categories";
import { AdminSubCategoryList } from "@features/categories";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";

const CategoryDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: categoryData, isLoading, isError } = useAdminCategory({ id });

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ categoryName: categoryData.name })} mb={8} />
            <InfoPanel id={id} />
            <AdminSubCategoryList parentId={id} mt={24} />
        </Box>
    );
};

export default CategoryDetailsPage;
