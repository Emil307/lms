import { Box } from "@mantine/core";
import React from "react";
import { BreadCrumbs, Heading } from "@shared/ui";
import { ContactsList } from "@features/contacts";
import { breadCrumbsItems } from "./constants";
import useStyles from "./ContactsPage.styles";

const ContactsPage = () => {
    const { classes } = useStyles();

    return (
        <Box className={classes.container}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Heading>Контакты</Heading>
            </Box>
            <ContactsList />
        </Box>
    );
};

export default ContactsPage;
