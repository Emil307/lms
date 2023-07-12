import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { List as AuthorList } from "@features/authors";

const AuthorsPage = () => {
    const router = useRouter();

    const openCreateAuthorForm = () => router.push({ pathname: "/admin/settings/authors/create" });

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={24}>
                <Heading>Авторы курсов</Heading>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={openCreateAuthorForm}>
                    Создать автора
                </Button>
            </Flex>
            <AuthorList />
        </Box>
    );
};

export default AuthorsPage;
