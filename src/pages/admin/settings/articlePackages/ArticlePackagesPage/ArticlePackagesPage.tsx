import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminArticlePackageList } from "@features/articlePackages";
import useStyles from "./ArticlePackagesPage.styles";

const ArticlePackagesPage = () => {
    const router = useRouter();
    const { classes } = useStyles();
    const isTablet = useMediaQuery("(max-width: 1024px)");

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
