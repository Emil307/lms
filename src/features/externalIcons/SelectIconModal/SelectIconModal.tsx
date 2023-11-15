import { Box, Flex, ScrollArea } from "@mantine/core";
import React, { useState } from "react";
import { ControlButtons } from "@shared/ui";
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
            <ControlButtons variant="modalTable" cancelButtonText="Отмена" onSubmit={handleSubmit} onClose={onClose} />
        </Flex>
    );
};

export default SelectIconModal;
