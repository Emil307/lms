import { Box, Flex, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import dayjs from "dayjs";
import { Button } from "@shared/ui";
import { ScheduleLine, useDeleteScheduleFromGroup } from "@entities/group";
import { getHumanDate } from "@shared/utils";
import useStyles from "./DeleteScheduleModal.styles";

interface DeleteScheduleModalProps {
    groupId?: string;
    data: ScheduleLine;
    onClose: () => void;
}

const DeleteScheduleModal = ({ groupId, data, onClose }: DeleteScheduleModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteSchedule = useDeleteScheduleFromGroup(groupId);

    const handleSubmit = () => {
        deleteSchedule.mutate(
            { scheduleId: data.id },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    const timingsRow = data.timings.data
        .map((time) => `${dayjs(time.from).format("HH:mm")} - ${dayjs(time.to).format("HH:mm")}`)
        .join(", ");

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Box className={classes.text}>{`Вы действительно хотите удалить занятие, «${getHumanDate(new Date(data.date), {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                })}, ${timingsRow}»?`}</Box>
            </Flex>
            <Flex gap={8}>
                <Button size="large" variant="border" onClick={onClose} loading={deleteSchedule.isLoading} w="100%">
                    Отмена
                </Button>
                <Button size="large" variant="secondary" onClick={handleSubmit} loading={deleteSchedule.isLoading} w="100%">
                    Удалить
                </Button>
            </Flex>
        </Flex>
    );
};

export default DeleteScheduleModal;
