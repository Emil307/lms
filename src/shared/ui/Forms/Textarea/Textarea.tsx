import React from "react";
import { Textarea as MTextarea, TextareaProps as MTextareaProps } from "@mantine/core";
import { useTextareaStyles } from "./Textarea.styles";

export interface TextareaProps extends MTextareaProps {}

const Textarea = ({ ...props }: TextareaProps) => {
    const { classes } = useTextareaStyles();
    return <MTextarea {...props} classNames={classes} />;
};

export default Textarea;
