import { Box } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import { useAdminAuthor } from "@entities/author";
import { UpdateAuthorForm } from "@features/authors";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";

const UpdateAuthorPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: authorData, isLoading } = useAdminAuthor({ id });

    const fullName = [authorData?.lastName, authorData?.firstName, authorData?.patronymic].join(" ");

    const handleCloseForm = () => router.push({ pathname: "/admin/settings/authors/[id]", query: { id } });

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ fullName, id })} mb={8} />
            <Heading>{fullName}</Heading>
            <UpdateAuthorForm data={authorData} onClose={handleCloseForm} />
        </Box>
    );
};

export default UpdateAuthorPage;
