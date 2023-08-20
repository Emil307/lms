import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminArticlePackageList } from "@features/articlePackages";
import useStyles from "./ArticlePackagesPage.styles";
import { useMedia } from "@shared/utils";

const ArticlePackagesPage = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const isTablet = useMedia("md");

    const openCreateArticlePackageForm = () => router.push("/admin/settings/article-packages/create");

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Пакеты базы знаний</Heading>
                <Button
                    variant="secondary"
                    size={isTablet ? "medium" : "large"}
                    leftIcon={<PlusCircle />}
                    onClick={openCreateArticlePackageForm}>
                    Создать пакет
                </Button>
            </Flex>
            <AdminArticlePackageList />
        </Box>
    );
};

export default ArticlePackagesPage;
