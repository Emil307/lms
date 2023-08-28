import { Box, BoxProps, Flex } from "@mantine/core";
import React from "react";
import { Flag, FolderPlus, Users } from "react-feather";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { Fieldset } from "@components/Fieldset";
import { Button, DisplayField, Heading } from "@shared/ui";
import { GetAdminGroupResponse, useAdminGroup } from "@entities/group";
import { getFullName } from "@shared/utils";
import { InfoCard } from "@components/InfoCard";
import { useSettingUserStyles } from "./GroupSettings.styles";
import { fields } from "./constants";
import { DeleteGroupButton } from "./components";
import { useUserRole } from "@entities/auth/hooks";
import { Roles } from "@app/routes";

export interface GroupSettingsProps extends Omit<BoxProps, "children"> {
    id: string;
}

const GroupSettings = ({ id, ...props }: GroupSettingsProps) => {
    const router = useRouter();
    const { classes } = useSettingUserStyles();
    const { data: groupData } = useAdminGroup({ id });

    const userRole = useUserRole();

    const handleOpenUpdateGroupForm = () => router.push({ pathname: "/admin/groups/[id]/edit", query: { id: String(groupData?.id) } });

    const teacherFullName = getFullName({ data: groupData?.teacher?.profile });

    const getEducationDates = () => {
        if (!groupData?.educationStartDate) {
            return "-";
        }
        return `${dayjs(groupData.educationStartDate).format("D MMMM YYYY")} - ${dayjs(groupData.educationStartDate).format(
            "D MMMM YYYY"
        )}`;
    };

    const renderInfoCardActions = () => {
        if (userRole === Roles.teacher) {
            return null;
        }
        return (
            <Button variant="secondary" onClick={handleOpenUpdateGroupForm}>
                Редактировать данные
            </Button>
        );
    };

    return (
        <Flex className={classes.info} {...props}>
            <Flex className={classes.settingsInfo}>
                <Flex className={classes.headingSettingsInfo}>
                    <Heading order={2}>Данные группы</Heading>
                    <DeleteGroupButton data={groupData} hidden={userRole === Roles.teacher} />
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
                    actionSlot={renderInfoCardActions()}
                />
            </Box>
        </Flex>
    );
};

export default GroupSettings;
