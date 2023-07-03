import { Flex, Group, ThemeIcon, Title } from "@mantine/core";
import { Paperclip } from "react-feather";
import { useMemo } from "react";
import { saveAs } from "file-saver";
import { FileItem } from "@shared/ui";
import { getFileSize } from "@shared/utils";
import { Article } from "@entities/article";
import useStyles from "./MaterialFiles.styles";
import { VideoItem } from "../VideoItem";

export interface MaterialFilesProps {
    data: Article;
}

const MaterialFiles = ({ data }: MaterialFilesProps) => {
    const { classes } = useStyles();

    const handleDownloadFile = (fileUrl: string, fileName: string) => saveAs(fileUrl, fileName);

    const renderVideos = useMemo(() => {
        if (!data.videos.length) return null;

        //TODO: Должен быть еще видеоплеер
        return (
            <Group>
                {data.videos.map((doc) => (
                    <VideoItem
                        key={doc.id}
                        fileName={doc.name}
                        fileSize={doc.size ? getFileSize(doc.size) : ""}
                        fileUrl={doc.absolutePath}
                        onDownloadFile={handleDownloadFile}
                    />
                ))}
            </Group>
        );
    }, [data.videos]);

    const renderDocuments = useMemo(() => {
        if (!data.documents.length) return null;

        return (
            <Flex direction="column" gap={16}>
                {data.documents.map((doc) => (
                    <FileItem
                        key={doc.id}
                        fileUrl={doc.absolutePath}
                        fileName={doc.name}
                        fileSize={doc.size ? getFileSize(doc.size) : ""}
                        type="document"
                        onDownloadFile={handleDownloadFile}
                    />
                ))}
            </Flex>
        );
    }, [data.documents]);

    return (
        <Flex className={classes.root}>
            <Title order={1} color="dark" sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                <ThemeIcon color="secondary" sx={{ borderRadius: 56, height: 60, width: 60 }}>
                    <Paperclip height={28} width={28} />
                </ThemeIcon>
                Прикрепленные файлы
            </Title>
            {renderVideos}
            {renderDocuments}
        </Flex>
    );
};

export default MaterialFiles;
