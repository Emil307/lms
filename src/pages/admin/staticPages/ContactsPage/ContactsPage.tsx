import { Box, Flex, Loader, Title } from "@mantine/core";
import React from "react";
import { useContacts } from "@entities/staticPage";
import { UpdateContactsForm } from "@features/contacts";
import { LastUpdatedInfo } from "@shared/ui";

const ContactsPage = () => {
    const { data, isLoading } = useContacts();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <Flex direction="column" gap={24}>
                <Title order={1} color="dark">
                    Контакты
                </Title>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
            <UpdateContactsForm mt={24} />
        </Box>
    );
};

export default ContactsPage;
