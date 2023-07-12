import { Group, Text } from "@mantine/core";
import React from "react";
import { ContentByTextEditor, Heading, Loader, Map } from "@shared/ui";
import { useContacts } from "@entities/staticPage";
import useStyles from "./ContactsList.styles";
import { mapState } from "./constants";

const ContactsList = () => {
    const { classes } = useStyles();
    const { data: contactsData, isFetching } = useContacts();

    return (
        <Group className={classes.container}>
            {isFetching && <Loader size="lg" />}
            <Heading order={4}>{contactsData?.title}</Heading>
            <Group className={classes.requisitesContainer}>
                {contactsData?.requisites && (
                    <>
                        <Text className={classes.requisitesTitle}>Реквизиты:</Text>
                        <ContentByTextEditor data={contactsData.requisites} />
                    </>
                )}
            </Group>
            <Map {...mapState} />
        </Group>
    );
};

export default ContactsList;
