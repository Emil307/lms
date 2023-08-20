import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminAuthorList } from "@features/authors";
import useStyles from "./AuthorsPage.styles";
import { useMedia } from "@shared/utils";

const AuthorsPage = () => {
    const router = useRouter();
    const { classes } = useStyles();

    const isTablet = useMedia("md");

    const openCreateAuthorForm = () => router.push({ pathname: "/admin/settings/authors/create" });

    return (
        <Box>
            <Flex className={classes.headingContainer}>
                <Heading>Авторы курсов</Heading>
                <Button variant="secondary" size={isTablet ? "medium" : "large"} leftIcon={<PlusCircle />} onClick={openCreateAuthorForm}>
                    Создать автора
                </Button>
            </Flex>
            <AdminAuthorList />
        </Box>
    );
};

export default AuthorsPage;
