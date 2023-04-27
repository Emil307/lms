import { Box, Title } from "@mantine/core";
import React from "react";
import { BreadCrumbs } from "@shared/ui";
import { breadCrumbsItems } from "./constants";
import { ContactsList } from "@features/contacts";
import useStyles from "./ContactsPage.styles";

const ContactsPage = () => {
    const { classes } = useStyles();

    return (
        <Box className={classes.container}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark">
                    Контакты
                </Title>
            </Box>
            <ContactsList />
        </Box>
    );
};

export default ContactsPage;
