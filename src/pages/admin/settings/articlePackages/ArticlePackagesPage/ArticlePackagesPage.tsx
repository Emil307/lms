import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { List as ArticlePackagesList } from "@features/articlePackages";

const ArticlePackagesPage = () => {
    const router = useRouter();
    const openCreateArticlePackageForm = () => router.push("/admin/settings/article-packages/create");

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={24}>
                <Title order={1} color="dark">
                    Пакеты базы знаний
                </Title>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={openCreateArticlePackageForm}>
                    Создать пакет
                </Button>
            </Flex>
            <ArticlePackagesList />
        </Box>
    );
};

export default ArticlePackagesPage;
