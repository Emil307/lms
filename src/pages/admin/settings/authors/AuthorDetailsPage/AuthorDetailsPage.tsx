import { Box, Text, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs, Loader } from "@shared/ui";
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
            <BreadCrumbs items={getBreadCrumbsItems({ authorName, id })} mb={8} />
            <Title order={1} color="dark" mb={24}>
                {authorName}
            </Title>
            <InfoPanel id={id} />
            <AuthorSettings id={id} />
        </Box>
    );
};

export default AuthorDetailsPage;
