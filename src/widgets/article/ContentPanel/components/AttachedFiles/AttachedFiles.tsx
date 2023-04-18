import { Flex, Group, ThemeIcon, Title } from "@mantine/core";
import { Paperclip } from "react-feather";
import { useMemo } from "react";
import { FileItem, UploadedFile } from "@shared/ui";
import { getFileSize } from "@shared/utils";
import useStyles from "./AttachedFiles.styles";
import { VideoItem } from "../VideoItem";

export interface AttachedFilesProps {
    data: {
        documents: { data: UploadedFile[] };
        videos: { data: UploadedFile[] };
    };
}

const AttachedFiles = ({ data }: AttachedFilesProps) => {
    const { classes } = useStyles();

    const downloadFile = () => undefined;

    const renderVideos = useMemo(
        () =>
            data.videos.data.map((doc) => (
                <VideoItem
                    key={doc.id}
                    fileId={doc.id}
                    fileName={doc.name}
                    fileSize={doc.size ? getFileSize(doc.size) : ""}
                    fileUrl={doc.absolutePath}
                    onDownloadFile={downloadFile}
                />
            )),
        []
    );

    const renderDocuments = useMemo(
        () =>
            data.documents.data.map((doc) => (
                <FileItem
                    key={doc.id}
                    fileId={doc.id}
                    fileName={doc.name}
                    fileSize={doc.size ? getFileSize(doc.size) : ""}
                    type="document"
                    onDownloadFile={downloadFile}
                />
            )),
        []
    );

    return (
        <Flex className={classes.root}>
            <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                <ThemeIcon color="secondary" sx={{ borderRadius: 56, height: 60, width: 60 }}>
                    <Paperclip height={28} width={28} />
                </ThemeIcon>
                Прикрепленные файлы
            </Title>
            <Group>{renderVideos}</Group>

            <Flex direction="column" gap={16}>
                {renderDocuments}
            </Flex>
        </Flex>
    );
};

export default AttachedFiles;
