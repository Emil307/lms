import { Box, Flex, Title } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button } from "@shared/ui";
import { AdminList as AdminArticleList } from "@features/articles";

const ArticlesPage = () => {
    const router = useRouter();

    const handleOpenCreateArticleForm = () => router.push("/admin/articles/create");

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Title order={1} color="dark">
                    База знаний
                </Title>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={handleOpenCreateArticleForm}>
                    Создать статью
                </Button>
            </Flex>
            <AdminArticleList mt={24} />
        </Box>
    );
};

export default ArticlesPage;
