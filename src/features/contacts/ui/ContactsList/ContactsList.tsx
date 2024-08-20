import { Flex, Text } from "@mantine/core";
import React from "react";
import { ContentByTextEditor, Heading, Loader, YanMap, Paragraph } from "@shared/ui";
import { useContacts } from "@entities/staticPage";
import useStyles from "./ContactsList.styles";
import { mapState } from "./constants";

const ContactsList = () => {
    const { classes } = useStyles();
    const { data: contactsData, isLoading, isError } = useContacts();

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    return (
        <Flex className={classes.root}>
            <Heading order={4}>{contactsData.title}</Heading>
            <Flex className={classes.requisitesContainer}>
                <Paragraph variant="small-m" color="gray45">
                    Реквизиты:
                </Paragraph>
                <ContentByTextEditor data={contactsData.requisites} />
            </Flex>
            <YanMap {...mapState} />
        </Flex>
    );
};

export default ContactsList;
