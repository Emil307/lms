import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { useUserRole } from "@entities/auth";
import { AdminList as AdminArticleList } from "@features/articles";
import { useMedia } from "@shared/utils";
import { Roles } from "@shared/types";
import useStyles from "./ArticlesPage.styles";

const ArticlesPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const userRole = useUserRole();

    const isTablet = useMedia("md");

    const handleOpenCreateArticleForm = () => router.push("/admin/articles/create");

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>База знаний</Heading>

                {userRole && userRole.name !== Roles.teacher && (
                    <Button
                        variant="secondary"
                        size={isTablet ? "medium" : "large"}
                        leftIcon={<PlusCircle />}
                        onClick={handleOpenCreateArticleForm}>
                        Создать статью
                    </Button>
                )}
            </Flex>
            <AdminArticleList />
        </Box>
    );
};

export default ArticlesPage;
