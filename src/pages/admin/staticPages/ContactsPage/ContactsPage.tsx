import { Box, Flex } from "@mantine/core";
import React from "react";
import { useContacts } from "@entities/staticPage";
import { UpdateContactsForm } from "@features/contacts";
import { Heading, LastUpdatedInfo, Loader } from "@shared/ui";

const ContactsPage = () => {
    const { data, isLoading } = useContacts();

    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box>
            <Flex direction="column" gap={24}>
                <Heading>Контакты</Heading>
                <LastUpdatedInfo data={data?.lastUpdated} />
            </Flex>
            <UpdateContactsForm mt={24} mb={8} />
        </Box>
    );
};

export default ContactsPage;
