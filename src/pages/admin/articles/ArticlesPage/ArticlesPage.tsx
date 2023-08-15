import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { useMediaQuery } from "@mantine/hooks";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminArticleList } from "@features/articles";
import useStyles from "./ArticlesPage.styles";

const ArticlesPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 1024px)");

    const handleOpenCreateArticleForm = () => router.push("/admin/articles/create");

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>База знаний</Heading>
                <Button
                    variant="secondary"
                    size={isTablet ? "medium" : "large"}
                    leftIcon={<PlusCircle />}
                    onClick={handleOpenCreateArticleForm}>
                    Создать статью
                </Button>
            </Flex>
            <AdminArticleList />
        </Box>
    );
};

export default ArticlesPage;
