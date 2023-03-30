import { ButtonProps } from "@mantine/core";
import { Button, FileButton as MFileButton, FileButtonProps as MFileButtonProps } from "@mantine/core";
import { UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { memo, ReactNode, useCallback } from "react";
import { FormErrorResponse } from "@shared/utils";
import { UploadedFile } from "@shared/ui";
import { UploadFileRequest } from "@entities/storage";
import useButtonStyles from "./FileButton.styles";

export interface FileButtonProps extends Omit<MFileButtonProps, "children" | "onChange"> {
    label: ReactNode;
    buttonProps?: Omit<ButtonProps, "OnChange">;
    useUploadFile: () => UseMutationResult<UploadedFile, AxiosError<FormErrorResponse>, UploadFileRequest>;
    onChange: (file: UploadedFile | null) => void;
}

const MemoizedFileButton = memo(function FileButton({ label, buttonProps, useUploadFile, onChange, ...props }: FileButtonProps) {
    const { classes } = useButtonStyles();

    const { mutate: uploadFile, isLoading: isUploading } = useUploadFile();

    const handleChange = useCallback((payload: File | null) => {
        if (payload !== null) {
            return uploadFile(
                { file: payload },
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
