import { Box, Flex, useMantineTheme } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";
import { useDeleteParticipantsFromGroup } from "@entities/group";
import useStyles from "./DeleteStudentFromGroupModal.styles";

export interface DeleteStudentFromGroupModalProps {
    groupId?: string;
    studentId: string;
    fullName: string;
    onClose: () => void;
}

const DeleteStudentFromGroupModal = ({ groupId = "", studentId, fullName, onClose }: DeleteStudentFromGroupModalProps) => {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const deleteSchedule = useDeleteParticipantsFromGroup({ groupId });

    const handleSubmit = () => {
        deleteSchedule.mutate(
            { ids: [studentId] },
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };

    return (
        <Flex direction="column" gap={24}>
            <Flex gap={16} mih={80}>
                <Flex align="center" justify="center" className={classes.warning}>
                    <AlertTriangle color={theme.colors.secondary[0]} />
                </Flex>
                <Box className={classes.text}>{`Вы действительно хотите удалить пользователя, «${studentId}: ${fullName}»?`}</Box>
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

export default DeleteStudentFromGroupModal;
