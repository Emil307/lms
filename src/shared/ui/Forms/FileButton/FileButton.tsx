import { Box, ButtonProps, Flex, Text } from "@mantine/core";
import { Button, FileButton as MFileButton, FileButtonProps as MFileButtonProps } from "@mantine/core";
import { memo, ReactNode, useCallback, useState } from "react";
import { AlertTriangle } from "react-feather";
import { FileType, useUploadFile } from "@entities/storage";
import { UploadedFile } from "@shared/types";
import { AvatarFileFormat } from "@shared/ui";
import { getCorrectFileFormats, isCorrectLoadedFileFormat } from "./constants";
import useButtonStyles from "./FileButton.styles";

export interface FileButtonProps extends Omit<MFileButtonProps, "children" | "onChange"> {
    label: ReactNode;
    type?: FileType;
    fileFormats?: AvatarFileFormat[];
    buttonProps?: Omit<ButtonProps, "OnChange">;
    onChange: (file: UploadedFile | null) => void;
    error?: string;
}

const MemoizedFileButton = memo(function FileButton({
    label,
    buttonProps,
    type = "avatar",
    fileFormats = ["jpeg", "jpg", "png"],
    error,
    onChange,
    ...props
}: FileButtonProps) {
    const { classes } = useButtonStyles();
    const [errorLoadFile, setErrorLoadFile] = useState<string>();

    const { mutate: uploadFile, isLoading: isUploading } = useUploadFile();

    const handleChange = useCallback((payload: File | null) => {
        if (!payload) {
            return onChange(payload);
        }

        if (!isCorrectLoadedFileFormat(payload, fileFormats)) {
            return setErrorLoadFile("Некорректный формат");
        }

        return uploadFile(
            { file: payload, type },
            {
                onSuccess: (uploadedImage) => {
                    onChange(uploadedImage);
                },
                onError: (error) => {
                    setErrorLoadFile(error.response?.data.message || error.message);
                },
            }
        );
    }, []);

    const renderError = () => {
        if (error && !errorLoadFile) {
            return (
                <Flex className={classes.error}>
                    <AlertTriangle />
                    <Text>{error}</Text>
                </Flex>
            );
        }
        if (errorLoadFile) {
            return (
                <Flex className={classes.error}>
                    <AlertTriangle />
                    <Text>{errorLoadFile}</Text>
                </Flex>
            );
        }
    };

    return (
        <Box>
            <MFileButton {...props} accept={getCorrectFileFormats(fileFormats)} onChange={handleChange}>
                {(props) => (
                    <Button classNames={classes} {...props} {...buttonProps} loading={isUploading}>
                        {label}
                    </Button>
                )}
            </MFileButton>
            {renderError()}
        </Box>
    );
});

export default MemoizedFileButton;
