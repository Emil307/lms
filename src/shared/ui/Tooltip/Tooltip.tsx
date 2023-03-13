import { Tooltip as MTooltip, TooltipProps as MTooltipProps, Text } from "@mantine/core";
import { memo, useMemo } from "react";
import useStyles from "./Tooltip.styles";

export interface TooltipProps extends MTooltipProps {
    lineClamp?: number;
}

const MemoizedTooltip = memo(function Tooltip({ label, lineClamp = 3, ...props }: TooltipProps) {
    const { classes } = useStyles();

    const labelBlock = useMemo(() => <Text lineClamp={lineClamp}>{label}</Text>, [label]);

    return <MTooltip {...props} classNames={classes} multiline withArrow label={labelBlock} />;
});

export default MemoizedTooltip;
