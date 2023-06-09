import { Box, Flex, Text, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { Shield, Trash, User as UserIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { useAdminAuthor } from "@entities/author";
import { DeleteAuthorModal } from "@features/authors";
import { InfoCard } from "@components/InfoCard";
import { fields } from "./constants";
import useStyles from "./AuthorSettings.styles";
import { getAuthorInfoCardFields } from "./utils";

interface AuthorSettingsProps {
    id: string;
}

const AuthorSettings = ({ id }: AuthorSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data } = useAdminAuthor({ id });

    const authorInfoCardFields = getAuthorInfoCardFields(data);

    const handleCloseDeleteAuthorModal = () => {
        closeModal("DELETE_AUTHOR");
        router.push({ pathname: "/admin/settings/authors" });
    };

    const openModalDeleteAuthor = () => {
        openModal({
            modalId: "DELETE_AUTHOR",
            title: "Удаление автора",
            centered: true,
            children: <DeleteAuthorModal id={id} fullName={authorInfoCardFields.fio} onClose={handleCloseDeleteAuthorModal} />,
        });
    };

    const openUserEditPage = () => router.push({ pathname: "/admin/settings/authors/[id]/edit", query: { id } });

    return (
        <Box>
            <Box mt={32} className={classes.info}>
                <Flex direction="column" gap={32}>
                    <Flex gap={48} align="center">
                        <Title order={2}>Данные автора</Title>
                        <Button
                            onClick={openModalDeleteAuthor}
                            variant="text"
                            leftIcon={
                                <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                    <Trash />
                                </ThemeIcon>
                            }>
                            Удалить автора
                        </Button>
                    </Flex>
                    <Fieldset label="Личные данные" icon={<UserIcon />}>
                        <DisplayField label="ФИО" value={authorInfoCardFields.fio} />
                    </Fieldset>

                    <Fieldset label="Об авторе" icon={<Shield />}>
                        <Text className={classes.description}>{data?.description}</Text>
                    </Fieldset>
                </Flex>
                <Box>
                    <InfoCard
                        avatar={{
                            src: data?.avatar?.absolutePath,
                        }}
                        values={authorInfoCardFields}
                        variant="whiteBg"
                        fields={fields}
                        actionSlot={
                            <Button variant="secondary" onClick={openUserEditPage}>
                                Редактировать данные
                            </Button>
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default AuthorSettings;
