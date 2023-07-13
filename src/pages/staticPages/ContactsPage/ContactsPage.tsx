import { Box, MediaQuery } from "@mantine/core";
import React from "react";
import { BreadCrumbs, Heading } from "@shared/ui";
import { ContactsList } from "@features/contacts";
import { breadCrumbsItems } from "./constants";

const ContactsPage = () => {
    return (
        <Box>
            <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
            </MediaQuery>
            <Heading mb={32}>Контакты</Heading>
            <ContactsList />
        </Box>
    );
};

export default ContactsPage;
