import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { useDeleteStudentsFromGroup } from "@entities/group";
import useStyles from "./DeleteStudentFromGroupModal.styles";

export interface DeleteStudentFromGroupModalProps {
    groupId?: string;
    studentId: number;
    fullName: string;
    onClose: () => void;
}

const DeleteStudentFromGroupModal = ({ groupId = "", studentId, fullName, onClose }: DeleteStudentFromGroupModalProps) => {
    const { classes } = useStyles();
    const deleteSchedule = useDeleteStudentsFromGroup({ groupId });

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
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Box>
                    <Paragraph variant="small-m" component="span">
                        {"Вы действительно хотите удалить пользователя, "}
                    </Paragraph>
                    <Paragraph variant="small-semi" component="span">{`«${studentId}: ${fullName}»?`}</Paragraph>
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

export default DeleteStudentFromGroupModal;
