import { Box, Loader, Text, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { useAuthor } from "@entities/author";
import { AuthorSettings, InfoPanel } from "@widgets/admin/authors";
import { getBreadCrumbsItems } from "./utils";

interface TRouterQueries {
    id: string;
}

const AuthorDetailPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: authorData, isLoading, isError } = useAuthor(id);

    const authorName = `${authorData?.lastName} ${authorData?.firstName}`;

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

export default AuthorDetailPage;
