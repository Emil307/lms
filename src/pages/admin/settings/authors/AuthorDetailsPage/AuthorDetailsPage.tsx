import { Box, Text } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Heading, Loader } from "@shared/ui";
import { useAdminAuthor } from "@entities/author";
import { AuthorSettings, InfoPanel } from "@widgets/admin/authors";
import { TRouterQueries } from "@shared/types";
import { getBreadCrumbsItems } from "./utils";

const AuthorDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: authorData, isLoading, isError } = useAdminAuthor({ id });

    const authorName = [authorData?.lastName, authorData?.firstName, authorData?.patronymic].join(" ");

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ authorName })} mb={8} />
            <Heading mb={24}>{authorName}</Heading>
            <InfoPanel id={id} mb={32} />
            <AuthorSettings id={id} />
        </Box>
    );
};

export default AuthorDetailsPage;
