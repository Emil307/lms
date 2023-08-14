import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import dayjs from "dayjs";
import { Button, Paragraph } from "@shared/ui";
import { AdminGroupScheduleFromList, useAdminDeleteGroupSchedule } from "@entities/group";
import useStyles from "./DeleteScheduleModal.styles";

export interface DeleteScheduleModalProps {
    groupId: string;
    data: AdminGroupScheduleFromList;
    onClose: () => void;
}

const DeleteScheduleModal = ({ groupId, data, onClose }: DeleteScheduleModalProps) => {
    const { classes } = useStyles();
    const deleteSchedule = useAdminDeleteGroupSchedule({ groupId, scheduleId: data.id });

    const handleSubmit = () => {
        deleteSchedule.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    const timingsRow = data.timings
        .map((timing) => `${dayjs(timing.from).format("HH:mm")} - ${dayjs(timing.to).format("HH:mm")}`)
        .join(", ");

    const scheduleDateWithTimingsRow = timingsRow
        ? [(dayjs(data.date).format("DD.MM.YYYY"), timingsRow)].join(", ")
        : dayjs(data.date).format("DD.MM.YYYY");

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {"Вы действительно хотите удалить занятие, "}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${scheduleDateWithTimingsRow}»?`}</Paragraph>
                </Box>
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
