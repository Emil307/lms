import { Flex, Box, Text, MultiSelectValueProps, CloseButton } from "@mantine/core";
import React from "react";
import { useMultiSelectValueItemStyles } from "./MultiSelectValueItem.styles";

interface MultiSelectValueItemProps extends MultiSelectValueProps {
    isActive?: boolean;
}

const MultiSelectValueItem = (props: MultiSelectValueItemProps) => {
    const { label, isActive, onRemove } = props;
    const { classes } = useMultiSelectValueItemStyles({ isActive });

    return (
        <Box className={classes.value}>
            <Flex className={classes.valueWrapper}>
                {classes.activeBadge && <Box className={classes.activeBadge}></Box>}
                <Text className={classes.valueLabel}>{label}</Text>
            </Flex>
            <CloseButton className={classes.valueRemove} onMouseDown={onRemove} />
        </Box>
    );
};

MultiSelectValueItem.displayName = "SelectItem";

export default MultiSelectValueItem;
