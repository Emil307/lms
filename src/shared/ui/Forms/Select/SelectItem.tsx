import { Flex } from "@mantine/core";
import { SelectItem as SelectItemProps } from "@mantine/core/lib/Select/types";
import React from "react";
import { Check } from "react-feather";
import { defaultTheme } from "@app/providers/Theme/theme";

export type Ref = HTMLDivElement;

export const SelectItem = React.forwardRef<Ref, SelectItemProps>((props, ref) => {
    const { selected, label } = props;

    return (
        <Flex align="center" justify="space-between" ref={ref} {...props}>
            {label}
            {selected && <Check width={16} color={defaultTheme.colors?.primary?.[0]} />}
        </Flex>
    );
});
SelectItem.displayName = "SelectItem";
