import { Box } from "@mantine/core";
import { ChangeEvent, memo, useCallback, useState } from "react";
import { Paragraph, Switch, SwitchProps } from "@shared/ui";
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
            <Paragraph variant="text-small-m" className={classes.label}>
                {label}
            </Paragraph>
            <Switch {...props} onChange={handleChangeSwitch} />
        </Box>
    );
});

export default MemoizedControlPanel;
