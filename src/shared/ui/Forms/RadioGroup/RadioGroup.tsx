import React from "react";
import { Radio as MRadio, RadioGroupProps as MRadioGroupProps } from "@mantine/core";
import { useRadioGroupStyles } from "./FRadioGroupStyles";

export interface RadioGroupProps extends MRadioGroupProps {}

export const RadioGroup = ({ children, ...props }: RadioGroupProps) => {
    const { classes } = useRadioGroupStyles();

    return (
        <MRadio.Group classNames={classes} {...props}>
            {children}
        </MRadio.Group>
    );
};
