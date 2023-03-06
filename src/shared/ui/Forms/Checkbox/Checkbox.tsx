import { Checkbox as MCheckbox, CheckboxProps as MCheckboxProps } from "@mantine/core";
import { memo, useCallback } from "react";
import { Check } from "react-feather";
import useStyles from "./Checkbox.styles";

export interface CheckboxProps extends MCheckboxProps {}

const MemoizedCheckbox = memo(function Checkbox(props: CheckboxProps) {
    const { classes } = useStyles();

    const getIcon = useCallback(() => <Check />, []);

    return <MCheckbox {...props} classNames={classes} icon={getIcon} />;
});

export default MemoizedCheckbox;
