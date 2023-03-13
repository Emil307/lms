import { Switch as MSwitch, SwitchProps as MSwitchProps } from "@mantine/core";
import { memo } from "react";
import useStyles from "./Switch.styles";

export interface SwitchProps extends MSwitchProps {
    variant: "primary" | "secondary";
}

const MemoizedSwitch = memo(function Switch({ variant = "primary", ...props }: SwitchProps) {
    const { classes } = useStyles({ variant });
    return <MSwitch {...props} classNames={classes} size="md" />;
});

export default MemoizedSwitch;
