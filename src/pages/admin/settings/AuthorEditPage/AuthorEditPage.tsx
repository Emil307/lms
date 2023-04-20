import { Box, Loader, Title } from "@mantine/core";
import React from "react";
import { useRouter } from "next/router";
import { BreadCrumbs } from "@shared/ui";
import { useAuthor } from "@entities/author";
import { EditAuthorForm } from "@features/authors";
import { getBreadCrumbsItems } from "./utils";

interface TRouterQueries {
    id: string;
}

const AuthorEditPage = () => {
    const router = useRouter();
    const { id } = router.query as TRouterQueries;
    const { data: authorData, isLoading } = useAuthor(id);

    const fullName = `${authorData?.lastName} ${authorData?.firstName}`;

    const handleCancel = () => router.push("/admin/settings/authors");

    if (!router.isReady || isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <BreadCrumbs items={getBreadCrumbsItems({ fullName, id })} mb={8} />
            <Title order={1} color="dark" mb={24}>
                {fullName}
            </Title>
            <EditAuthorForm data={authorData} onClose={handleCancel} />
        </Box>
    );
};

export default AuthorEditPage;
