import { Box, Text } from "@mantine/core";
import { ChangeEvent, memo, useCallback, useState } from "react";
import { Switch, SwitchProps } from "@shared/ui";
import useStyles from "./ControlPanel.styles";

export interface ControlPanelProps extends Omit<SwitchProps, "label"> {
    label: string;
}

const MemoizedControlPanel = memo(function ControlPanel({ label, onChange = () => undefined, ...props }: ControlPanelProps) {
    const [checked, setChecked] = useState(props.checked);
    const { classes } = useStyles({ checked });

    const handleChangeSwitch = useCallback((newValue: ChangeEvent<HTMLInputElement>) => {
        onChange(newValue);
        setChecked(newValue.target.checked);
    }, []);

    return (
        <Box className={classes.root}>
            <Text className={classes.label} lineClamp={2}>
                {label}
            </Text>
            <Switch {...props} onChange={handleChangeSwitch} />
        </Box>
    );
});

export default MemoizedControlPanel;