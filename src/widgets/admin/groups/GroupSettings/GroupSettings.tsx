import { Box, BoxProps, Flex } from "@mantine/core";
import React from "react";
import { Trash, Flag, FolderPlus, Users } from "react-feather";
import { closeModal, openModal } from "@mantine/modals";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading } from "@shared/ui";
import { GetAdminGroupResponse, useAdminGroup } from "@entities/group";
import { getFullName } from "@shared/utils";
import { DeleteGroupModal } from "@features/groups";
import { InfoCard } from "@components/InfoCard";
import { useSettingUserStyles } from "./GroupSettings.styles";
import { fields } from "./constants";
import "dayjs/locale/ru";
dayjs.locale("ru");

export interface GroupSettingsProps extends BoxProps {
    id: string;
}

const GroupSettings = ({ id, ...props }: GroupSettingsProps) => {
    const router = useRouter();
    const { classes } = useSettingUserStyles();
    const { data: groupData } = useAdminGroup({ id });

    const handleOpenUpdateGroupForm = () => router.push({ pathname: "/admin/groups/[id]/edit", query: { id: String(groupData?.id) } });

    const handleCloseDeleteGroupModal = () => closeModal("DELETE_GROUP");

    const openModalDeleteGroup = () => {
        openModal({
            modalId: "DELETE_GROUP",
            title: "Удаление группы",
            children: <DeleteGroupModal id={id} name={groupData?.name} onClose={handleCloseDeleteGroupModal} />,
        });
    };

    const teacherFullName = getFullName({ data: groupData?.teacher?.profile });

    const getEducationDates = () => {
        if (!groupData?.educationStartDate || !groupData.educationFinishDate) {
            return "-";
        }
        return `${dayjs(groupData.educationStartDate).format("D MMMM")} - ${dayjs(groupData.educationStartDate).format("D MMMM YYYY")}`;
    };

    return (
        <Box {...props} className={classes.root}>
            <Flex direction="column" gap={32}>
                <Flex gap={48} align="center">
                    <Heading order={2}>Данные группы</Heading>
                    <Button onClick={openModalDeleteGroup} variant="text" leftIcon={<Trash />}>
                        Удалить группу
                    </Button>
                </Flex>
                <Fieldset label="Направление обучения" icon={<Flag />} legendProps={{ mb: 24 }}>
                    <DisplayField label="Учебный курс" value={groupData?.course.name} />
                </Fieldset>
                <Fieldset label="Данные группы" icon={<FolderPlus />} legendProps={{ mb: 24 }}>
                    <DisplayField label="Название группы" value={groupData?.name} />
                    <DisplayField label="Даты обучения" value={getEducationDates()} />
                    <DisplayField label="Учеников в группе (max)" value={String(groupData?.maxStudentsCount)} />
                </Fieldset>
                <Fieldset label="Преподаватель группы" icon={<Users />} legendProps={{ mb: 24 }}>
                    <DisplayField label="ФИО" value={teacherFullName} />
                </Fieldset>
            </Flex>
            <Box>
                <InfoCard<GetAdminGroupResponse>
                    variant="whiteBg"
                    fields={fields}
                    values={groupData}
                    actionSlot={
                        <Button variant="secondary" onClick={handleOpenUpdateGroupForm}>
                            Редактировать данные
                        </Button>
                    }
                />
            </Box>
        </Box>
    );
};

export default GroupSettings;
