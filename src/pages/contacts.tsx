import { Box, Title, Text, Group } from "@mantine/core";
import React from "react";
import { BreadCrumbs, TBreadCrumbItem } from "@shared/ui";
import { Map } from "@features/contacts";
import { useContacts } from "@entities/staticPage";

const breadCrumbsItems: TBreadCrumbItem[] = [
    { title: "Главная страница", href: { pathname: "/" } },
    { title: "Контакты", href: { pathname: "/contacts" } },
];

const ContactsPage = () => {
    const { data: contactsData } = useContacts();

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <Box>
                <BreadCrumbs items={breadCrumbsItems} mb={8} />
                <Title order={1} color="dark">
                    Контакты
                </Title>
            </Box>
            <Group
                sx={(theme) => ({
                    flexDirection: "column",
                    flexWrap: "nowrap",
                    alignItems: "flex-start",
                    padding: 32,
                    gap: 32,
                    borderRadius: 24,
                    backgroundColor: theme.colors.white[0],
                })}>
                <Text
                    sx={(theme) => ({
                        fontWeight: 600,
                        fontSize: 18,
                        lineHeight: "24px",
                        color: theme.colors.dark[0],
                    })}>
                    {contactsData?.title}
                </Text>
                <Group
                    sx={{
                        flexDirection: "column",
                        flexWrap: "nowrap",
                        alignItems: "flex-start",
                        gap: 8,
                    }}>
                    {contactsData?.requisites && (
                        <>
                            <Text
                                sx={(theme) => ({
                                    fontWeight: 500,
                                    fontSize: 16,
                                    lineHeight: "24px",
                                    color: theme.colors.gray45[0],
                                })}>
                                Реквизиты:
                            </Text>
                            <Text
                                sx={(theme) => ({
                                    fontWeight: 400,
                                    fontSize: 16,
                                    lineHeight: "24px",
                                    color: theme.colors.dark[0],
                                    p: {
                                        margin: 0,
                                    },
                                })}
                                dangerouslySetInnerHTML={{ __html: contactsData.requisites }}
                            />
                        </>
                    )}
                </Group>
                <Map />
            </Group>
            {/* TODO: пока что отказались от этой формы на мите 21 Mar */}
            {/* <ContactUsForm maw={648} /> */}
        </Box>
    );
};

export default ContactsPage;
