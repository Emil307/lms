import React from "react";
import { Radio as MRadio, RadioProps as MRadioProps } from "@mantine/core";
import { useRadioStyles } from "./RadioStyles";

export interface RadioProps extends MRadioProps {}

export const Radio = ({ ...props }: RadioProps) => {
    const { classes } = useRadioStyles();
    return <MRadio {...props} classNames={classes} />;
};
