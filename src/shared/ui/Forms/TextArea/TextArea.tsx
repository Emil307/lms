import React from "react";
import { Textarea as MTextarea, TextareaProps as MTextareaProps } from "@mantine/core";
import { useTextareaStyles } from "./TextArea.styles";

export interface TextAreaProps extends MTextareaProps {}

const TextArea = ({ ...props }: TextAreaProps) => {
    const { classes } = useTextareaStyles();
    return <MTextarea {...props} classNames={classes} />;
};

export default TextArea;
