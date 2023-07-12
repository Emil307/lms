import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { AdminList as ArticlePackageAdminList } from "@features/articlePackages";

const ArticlePackagesPage = () => {
    const router = useRouter();
    const openCreateArticlePackageForm = () => router.push("/admin/settings/article-packages/create");

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={24}>
                <Heading>Пакеты базы знаний</Heading>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={openCreateArticlePackageForm}>
                    Создать пакет
                </Button>
            </Flex>
            <ArticlePackageAdminList />
        </Box>
    );
};

export default ArticlePackagesPage;
