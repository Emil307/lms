import { Box, Flex, Text } from "@mantine/core";
import React from "react";
import { BreadCrumbs, Display, Loader } from "@shared/ui";
import { ContactsList, Requisites, Support, useContacts } from "@entities/staticPage";
import { breadCrumbsItems } from "./constants";
import useStyles from "./ContactsPage.styles";

const ContactsPage = () => {
    const { classes } = useStyles();

    const { data: contactsData, isLoading, isError } = useContacts();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Box>
            <BreadCrumbs items={breadCrumbsItems} mb={16} />
            <Flex className={classes.wrapper}>
                <Display>Контакты</Display>
                <Box>
                    <ContactsList address={contactsData.title} />
                    <Flex className={classes.requisitesWrapper}>
                        <Requisites data={contactsData.requisites} />
                        <Support />
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
};

export default ContactsPage;
