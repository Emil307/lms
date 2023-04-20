import { Box, Flex, Text, ThemeIcon, Title } from "@mantine/core";
import React from "react";
import { Shield, Trash, User as UserIcon } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { ProfileInfo } from "@components/ProfileInfo";
import { useAuthor } from "@entities/author";
import { DeleteAuthorModal } from "@features/authors";
import { fields } from "./constants";
import useStyles from "./AuthorSettings.styles";

interface AuthorSettingsProps {
    id: string;
}

const AuthorSettings = ({ id }: AuthorSettingsProps) => {
    const router = useRouter();
    const { classes } = useStyles();
    const { data } = useAuthor(id);

    const dataProfile = {
        fio: `${data?.lastName}  ${data?.firstName} ${data?.patronymic}`,
    };

    const handleCloseDeleteAuthorModal = () => {
        closeModal("DELETE_AUTHOR");
        router.push({ pathname: "/admin/settings/authors" });
    };

    const openModalDeleteAuthor = () => {
        openModal({
            modalId: "DELETE_AUTHOR",
            title: "Удаление автора",
            centered: true,
            children: <DeleteAuthorModal id={id} fullName={dataProfile.fio} onClose={handleCloseDeleteAuthorModal} />,
        });
    };

    const openUserEditPage = () => router.push({ pathname: "/admin/students/[id]/edit", query: { id } });

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
                        <DisplayField label="ФИО" value={dataProfile.fio} />
                    </Fieldset>

                    <Fieldset label="Об авторе" icon={<Shield />}>
                        <Text className={classes.description}>{data?.about}</Text>
                    </Fieldset>
                </Flex>
                <Box>
                    <ProfileInfo
                        avatarSrc={data?.avatar ?? ""}
                        values={dataProfile}
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
