import { ButtonProps } from "@mantine/core";
import { Button, FileButton as MFileButton, FileButtonProps as MFileButtonProps } from "@mantine/core";
import { memo, ReactNode } from "react";
import useButtonStyles from "./FileButton.styles";

export interface FileButtonProps extends Omit<MFileButtonProps, "children"> {
    label: ReactNode;
    buttonProps?: Omit<ButtonProps, "OnChange">;
}

const MemoizedFileButton = memo(function FileButton({ label, buttonProps, ...props }: FileButtonProps) {
    const { classes } = useButtonStyles();

    return (
        <MFileButton {...props}>
            {(props) => (
                <Button classNames={classes} {...props} {...buttonProps}>
                    {label}
                </Button>
            )}
        </MFileButton>
    );
});

export default MemoizedFileButton;
