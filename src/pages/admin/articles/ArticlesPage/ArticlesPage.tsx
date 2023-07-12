import { Box, Flex } from "@mantine/core";
import React from "react";
import { PlusCircle } from "react-feather";
import { useRouter } from "next/router";
import { Button, Heading } from "@shared/ui";
import { AdminList as AdminArticleList } from "@features/articles";

const ArticlesPage = () => {
    const router = useRouter();

    const handleOpenCreateArticleForm = () => router.push("/admin/articles/create");

    return (
        <Box>
            <Flex align="center" justify="space-between">
                <Heading>База знаний</Heading>
                <Button variant="secondary" size="large" leftIcon={<PlusCircle />} onClick={handleOpenCreateArticleForm}>
                    Создать статью
                </Button>
            </Flex>
            <AdminArticleList mt={24} />
        </Box>
    );
};

export default ArticlesPage;
