import { Flex, ScrollArea } from "@mantine/core";
import React, { useState } from "react";
import { Button } from "@shared/ui";
import { List as ExternalIconList } from "@widgets/externalIcons";

export interface SelectIconModalProps {
    initialSelectedIcon?: string;
    onSubmit: (iconName: string) => void;
    onClose: () => void;
}

const SelectIconModal = ({ initialSelectedIcon = "", onSubmit, onClose }: SelectIconModalProps) => {
    const [selectedIcon, setSelectedIcon] = useState<string>(initialSelectedIcon);

    const handleSubmit = () => onSubmit(selectedIcon);

    const handleSelectIcon = (iconId: string) => {
        if (selectedIcon === iconId) {
            return setSelectedIcon("");
        }
        setSelectedIcon(iconId);
    };

    return (
        <Flex direction="column" gap={24}>
            <ScrollArea.Autosize maxHeight={472} style={{ height: "100%", width: "100%" }} type="auto" offsetScrollbars scrollbarSize={4}>
                <ExternalIconList selectedIconId={selectedIcon} onSelect={handleSelectIcon} h={472} />
            </ScrollArea.Autosize>
            <Flex gap={8} justify="space-between">
                <Button variant="border" fullWidth onClick={onClose} w="100%" maw={252}>
                    Отмена
                </Button>
                <Button variant="secondary" fullWidth onClick={handleSubmit} w="100%" maw={252}>
                    Сохранить
                </Button>
            </Flex>
        </Flex>
    );
};

export default SelectIconModal;
