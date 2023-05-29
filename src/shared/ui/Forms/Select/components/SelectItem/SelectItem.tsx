import { Flex, Box, Text } from "@mantine/core";
import { SelectItem as SelectItemProps } from "@mantine/core/lib/Select/types";
import React from "react";
import { Check } from "react-feather";
import { useSelectItemStyles } from "./SelectItemStyles";

const SelectItem = (props: SelectItemProps) => {
    const { selected, label, isActive } = props;
    const { classes } = useSelectItemStyles({ isActive, selected });

    return (
        <Flex {...props} className={classes.wrapper}>
            <Flex className={classes.labelWrapper}>
                {classes.activeBadge && <Box className={classes.activeBadge}></Box>}
                <Text className={classes.labelValue}>{label}</Text>
            </Flex>
            {selected && <Check className={classes.check} />}
        </Flex>
    );
};

SelectItem.displayName = "SelectItem";

export default SelectItem;
