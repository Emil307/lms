import { Box, Loader } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { useAdminCategory } from "@entities/category";
import { InfoPanel } from "@widgets/admin/categories";
import { SubCategoryList } from "@features/categories";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";

const CategoryPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: categoryData, isLoading } = useAdminCategory(id);

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ categoryName: categoryData?.name, id })} mb={8} />
            <InfoPanel id={id} />
            <SubCategoryList />
        </Box>
    );
};

export default CategoryPage;
