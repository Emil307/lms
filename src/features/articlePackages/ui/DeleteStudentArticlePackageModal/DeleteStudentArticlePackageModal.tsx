import { Box, Flex, ThemeIcon } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { ControlButtons, Heading, Paragraph } from "@shared/ui";
import { useDeleteStudentArticlePackage } from "@entities/articlePackage";
import useStyles from "./DeleteStudentArticlePackageModal.styles";

export interface DeleteStudentArticlePackageModalProps {
    id: number;
    studentId: string;
    name?: string;
    onClose: () => void;
}

const DeleteStudentArticlePackageModal = ({ id, studentId, name = "", onClose }: DeleteStudentArticlePackageModalProps) => {
    const { classes } = useStyles();
    const deleteStudentArticlePackage = useDeleteStudentArticlePackage({ studentId, articlePackageId: id, name });

    const handleSubmit = () => {
        deleteStudentArticlePackage.mutate(null, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Flex direction="column" gap={56}>
            <Flex gap={16}>
                <ThemeIcon className={classes.warning}>
                    <AlertTriangle />
                </ThemeIcon>
                <Flex direction="column" gap={8}>
                    <Heading order={4}>Внимание!</Heading>
                    <Box>
                        <Paragraph variant="small-m" component="span">
                            {`Ученик потеряет доступ к пакету базы знаний. Вы уверены, что хотите удалить доступ к пакету, `}
                        </Paragraph>
                        <Paragraph variant="small-semi" component="span">{`«${name}»?`}</Paragraph>
                    </Box>
                </Flex>
            </Flex>
            <ControlButtons
                variant="modal"
                cancelButtonText="Отмена"
                submitButtonText="Удалить"
                onSubmit={handleSubmit}
                onClose={onClose}
                isLoading={deleteStudentArticlePackage.isLoading}
            />
        </Flex>
    );
};

export default DeleteStudentArticlePackageModal;
