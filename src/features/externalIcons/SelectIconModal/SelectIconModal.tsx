import { Box, Flex, ScrollArea } from "@mantine/core";
import React, { useState } from "react";
import { Button } from "@shared/ui";
import { List as ExternalIconList } from "@widgets/externalIcons";
import { useMedia } from "@shared/utils";

export interface SelectIconModalProps {
    initialSelectedIcon?: string;
    onSubmit: (iconName: string) => void;
    onClose: () => void;
}

const SelectIconModal = ({ initialSelectedIcon = "", onSubmit, onClose }: SelectIconModalProps) => {
    const [selectedIcon, setSelectedIcon] = useState<string>(initialSelectedIcon);

    const isMobile = useMedia("xs");

    const handleSubmit = () => onSubmit(selectedIcon);

    const handleSelectIcon = (iconId: string) => {
        if (selectedIcon === iconId) {
            return setSelectedIcon("");
        }
        setSelectedIcon(iconId);
    };

    return (
        <Flex direction="column" gap={24}>
            <Box>
                <ScrollArea.Autosize
                    maxHeight={472}
                    style={{ height: "100%", width: "100%" }}
                    type="auto"
                    offsetScrollbars
                    scrollbarSize={4}>
                    <ExternalIconList selectedIconId={selectedIcon} onSelect={handleSelectIcon} h={472} />
                </ScrollArea.Autosize>
            </Box>

            <Flex gap={8} justify="space-between">
                <Button variant="border" size={isMobile ? "medium" : "large"} onClick={onClose} w="100%" maw={252}>
                    Отмена
                </Button>
                <Button variant="secondary" size={isMobile ? "medium" : "large"} onClick={handleSubmit} w="100%" maw={252}>
                    Сохранить
                </Button>
            </Flex>
        </Flex>
    );
};

export default SelectIconModal;
