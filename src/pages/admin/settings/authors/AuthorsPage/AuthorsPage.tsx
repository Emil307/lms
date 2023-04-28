import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { List as AuthorList } from "@features/authors";

const AuthorsPage = () => {
    const router = useRouter();

    const openCreateAuthorForm = () => router.push({ pathname: "/admin/settings/authors/create" });

    return (
        <Box>
            <Flex align="center" justify="space-between" mb={24}>
                <Title order={1} color="dark">
                    Авторы курсов
                </Title>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={openCreateAuthorForm}>
                    Создать автора
                </Button>
            </Flex>
            <AuthorList />
        </Box>
    );
};

export default AuthorsPage;
