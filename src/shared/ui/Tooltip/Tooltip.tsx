import { Tooltip as MTooltip, TooltipProps as MTooltipProps } from "@mantine/core";
import { memo } from "react";
import useStyles from "./Tooltip.styles";

const MemoizedTooltip = memo(function Tooltip({ children, ...props }: MTooltipProps) {
    const { classes } = useStyles();

    return (
        <MTooltip classNames={classes} multiline withArrow {...props}>
            {children}
        </MTooltip>
    );
});

export default MemoizedTooltip;
