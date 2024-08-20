import { Avatar, Box, Flex, ThemeIcon, FileButton as MFileButton, FileButtonProps as MFileButtonProps } from "@mantine/core";
import React, { memo, ReactNode, useCallback, useState } from "react";
import { AlertTriangle, Edit3, Info } from "react-feather";
import { FileType, useUploadFile } from "@entities/storage";
import { UploadedFile } from "@shared/types";
import { AvatarFileFormat, Button, Paragraph } from "@shared/ui";
import { getFileSize } from "@shared/utils";
import AvatarIcon from "@public/icons/avatar.svg";
import { DEFAULT_MAX_FILE_SIZE, getCorrectFileFormats, isCorrectLoadedFileFormat } from "./constants";
import useStyles from "./AvatarInput.styles";

export interface AvatarInputProps extends Omit<MFileButtonProps, "children" | "onChange"> {
    label: ReactNode;
    type?: FileType;
    fileFormats?: AvatarFileFormat[];
    value?: UploadedFile | null;
    onChange: (file: UploadedFile | null) => void;
    title?: string | null;
    subtitle?: string;
    infoSlot?: ReactNode;
    error?: string;
    maxFileSize?: number;
    description?: string;
}

const AvatarInput = ({
    label,
    value,
    title,
    subtitle,
    type = "avatar",
    fileFormats = ["jpeg", "jpg", "png"],
    error,
    onChange,
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    description,
    ...props
}: AvatarInputProps) => {
    const { classes } = useStyles();
    const [errorLoadFile, setErrorLoadFile] = useState<string>();

    const { mutate: uploadFile, isLoading: isUploading } = useUploadFile();

    const handleChange = useCallback((payload: File | null) => {
        if (!payload) {
            return onChange(payload);
        }

        if (payload.size > maxFileSize) {
            return setErrorLoadFile(`Размер не должен превышать ${getFileSize(maxFileSize)}`);
        }

        if (!isCorrectLoadedFileFormat(payload, fileFormats)) {
            return setErrorLoadFile("Некорректный формат");
        }

        return uploadFile(
            { file: payload, type },
            {
                onSuccess: (uploadedImage) => {
                    onChange(uploadedImage);
                    setErrorLoadFile(undefined);
                },
                onError: (error) => {
                    setErrorLoadFile(error.response?.data.message || error.message);
                },
            }
        );
    }, []);

    const renderContent = () => {
        if (!title && !subtitle) {
            return null;
        }
        return (
            <Flex className={classes.content} direction="column" gap={4}>
                {title && <Paragraph variant="small-semi">{title}</Paragraph>}
                {subtitle && (
                    <Paragraph variant="text-small-m" color="primaryHover">
                        {subtitle}
                    </Paragraph>
                )}
            </Flex>
        );
    };

    const renderError = () => {
        if (error && !errorLoadFile) {
            return (
                <Flex className={classes.error}>
                    <AlertTriangle />
                    <Paragraph variant="text-smaller">{error}</Paragraph>
                </Flex>
            );
        }
        if (errorLoadFile) {
            return (
                <Flex className={classes.error}>
                    <AlertTriangle />
                    <Paragraph variant="text-smaller">{errorLoadFile}</Paragraph>
                </Flex>
            );
        }
        return null;
    };

    const renderDescription = () => {
        if (!description) {
            return null;
        }
        return (
            <Flex gap={4} align="center" mt={4}>
                <ThemeIcon color="primaryHover" w={16} h={16}>
                    <Info />
                </ThemeIcon>
                <Paragraph variant="text-smaller">{description}</Paragraph>
            </Flex>
        );
    };

    return (
        <Box>
            <Flex gap={24} align="center">
                <Avatar className={classes.avatarWrapper} src={value?.absolutePath} alt="avatar">
                    <AvatarIcon />
                </Avatar>
                <Flex direction="column" gap={8}>
                    {renderContent()}
                    <Box>
                        <MFileButton {...props} accept={getCorrectFileFormats(fileFormats)} onChange={handleChange}>
                            {(props) => (
                                <Button variant="text" classNames={classes} {...props} leftIcon={<Edit3 />} loading={isUploading}>
                                    {label}
                                </Button>
                            )}
                        </MFileButton>
                    </Box>
                </Flex>
            </Flex>
            {renderError()}
            {renderDescription()}
        </Box>
    );
};

export default memo(AvatarInput);
