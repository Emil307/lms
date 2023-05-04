import { ButtonProps } from "@mantine/core";
import { Button, FileButton as MFileButton, FileButtonProps as MFileButtonProps } from "@mantine/core";
import { memo, ReactNode, useCallback } from "react";
import { UploadFileType, useUploadFile } from "@entities/storage";
import { UploadedFile } from "@shared/types";
import useButtonStyles from "./FileButton.styles";

export interface FileButtonProps extends Omit<MFileButtonProps, "children" | "onChange"> {
    label: ReactNode;
    type?: UploadFileType;
    buttonProps?: Omit<ButtonProps, "OnChange">;
    onChange: (file: UploadedFile | null) => void;
}

const MemoizedFileButton = memo(function FileButton({ label, buttonProps, type = "avatar", onChange, ...props }: FileButtonProps) {
    const { classes } = useButtonStyles();

    const { mutate: uploadFile, isLoading: isUploading } = useUploadFile();

    const handleChange = useCallback((payload: File | null) => {
        if (payload !== null) {
            return uploadFile(
                { file: payload, type },
                {
                    onSuccess: (uploadedImage) => {
                        onChange(uploadedImage);
                    },
                }
            );
        }
        onChange(payload);
    }, []);

    return (
        <MFileButton {...props} onChange={handleChange}>
            {(props) => (
                <Button classNames={classes} {...props} {...buttonProps} loading={isUploading}>
                    {label}
                </Button>
            )}
        </MFileButton>
    );
});

export default MemoizedFileButton;
