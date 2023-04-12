import { Box, Flex, Group, ThemeIcon, Title } from "@mantine/core";
import React, { useMemo } from "react";
import { Trash, Flag, FolderPlus, Users } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField } from "@shared/ui";
import { useAdminGroup } from "@entities/group";
import { getHumanDate } from "@shared/utils";
import { DeleteGroupModal } from "@features/groups";
import { useSettingUserStyles } from "./GroupSettings.styles";

export interface GroupSettingsProps {
    id: string;
}

const GroupSettings = ({ id }: GroupSettingsProps) => {
    const router = useRouter();
    const { classes } = useSettingUserStyles();
    const { data: groupData } = useAdminGroup(id);

    const handleOpenEditGroup = () => router.push({ pathname: "/admin/groups/[id]/edit", query: { id: String(groupData?.data.id) } });

    const handleCloseDeleteGroupModal = () => closeModal("DELETE_GROUP");

    const openModalDeleteGroup = () => {
        openModal({
            modalId: "DELETE_GROUP",
            title: "Удаление группы",
            centered: true,
            children: <DeleteGroupModal id={id} name={groupData?.data.name || ""} onClose={handleCloseDeleteGroupModal} />,
        });
    };

    const studyDates = useMemo(() => {
        if (!groupData?.data.education.from || !groupData.data.education.to) {
            return "-";
        }
        return `${getHumanDate(new Date(groupData.data.education.from), {
            month: "long",
            day: "2-digit",
        })} - ${getHumanDate(new Date(groupData.data.education.from), {
            month: "long",
            day: "2-digit",
            year: "numeric",
        })}`;
    }, [groupData?.data.education]);

    return (
        <Box>
            <Box mt={32} className={classes.info}>
                <Group sx={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <Flex gap={48} align="center">
                        <Title order={2} color="dark">
                            Данные группы
                        </Title>
                        <Button
                            onClick={openModalDeleteGroup}
                            variant="text"
                            leftIcon={
                                <ThemeIcon color="dark" variant="outline" sx={{ border: "none" }}>
                                    <Trash />
                                </ThemeIcon>
                            }>
                            Удалить группу
                        </Button>
                    </Flex>
                    <Fieldset mt={32} label="Направление обучения" icon={<Flag />}>
                        <DisplayField label="Учебный курс" value={groupData?.data.courseName} />
                    </Fieldset>
                    <Fieldset mt={32} label="Данные группы" icon={<FolderPlus />}>
                        <DisplayField label="Название группы" value={groupData?.data.name} />
                        <DisplayField label="Даты обучения" value={studyDates} />
                        <DisplayField label="Учеников в группе (max)" value={String(groupData?.data.students)} />
                    </Fieldset>
                    <Fieldset mt={32} label="Преподаватели группы" icon={<Users />}>
                        <DisplayField label="ФИО" value={groupData?.data.teacherFullName} />
                    </Fieldset>
                </Group>
                <Box>
                    <Flex className={classes.groupInfo}>
                        <DisplayField label="Учебный курс" value={groupData?.data.courseName} variant="compact" />
                        <DisplayField label="Название группы" value={groupData?.data.courseName} variant="compact" />
                        <DisplayField label="Максимальная численность" value={String(groupData?.data.students)} variant="compact" />
                        <Button variant="secondary" mt={16} onClick={handleOpenEditGroup}>
                            Редактировать данные
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};

export default GroupSettings;
