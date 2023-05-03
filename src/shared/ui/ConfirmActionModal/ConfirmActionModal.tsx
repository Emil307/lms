import { Text, Flex, ThemeIcon, Group } from "@mantine/core";
import React from "react";
import { AlertTriangle } from "react-feather";
import { Button } from "@shared/ui";

export interface ConfirmActionModalProps {
    onSubmit: () => void;
    onClose: () => void;
}

const ConfirmActionModal = ({ onSubmit, onClose }: ConfirmActionModalProps) => {
    return (
        <>
            <Group sx={{ flexWrap: "nowrap" }} pb={32}>
                <ThemeIcon
                    sx={(theme) => ({
                        minWidth: 48,
                        background: theme.colors.secondary16[0],
                        svg: {
                            color: theme.colors.secondary[0],
                        },
                    })}
                    color="secondary"
                    radius={50}
                    w={48}
                    h={48}>
                    <AlertTriangle />
                </ThemeIcon>
                <Text sx={(theme) => ({ fontWeight: 500, fontSize: 16, lineHeight: "24px", color: theme.colors.dark[0] })}>
                    Вы хотите сохранить изменения перед закрытием?
                </Text>
            </Group>
            <Flex gap={8}>
                <Button variant="border" fullWidth onClick={onClose} w="100%">
                    Закрыть
                </Button>
                <Button variant="secondary" fullWidth onClick={onSubmit} w="100%">
                    Сохранить
                </Button>
            </Flex>
        </>
    );
};

export default ConfirmActionModal;
