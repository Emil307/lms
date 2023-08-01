import { Flex, Group, ThemeIcon } from "@mantine/core";
import { Paperclip } from "react-feather";
import { useMemo } from "react";
import { FileItem, Heading, VideoItem } from "@shared/ui";
import { Article } from "@entities/article";
import useStyles from "./MaterialFiles.styles";

export interface MaterialFilesProps {
    data: Article;
}

const MaterialFiles = ({ data }: MaterialFilesProps) => {
    const { classes } = useStyles();

    const renderVideos = useMemo(() => {
        if (!data.videos.length) return null;

        return (
            <Group>
                {data.videos.map((doc) => (
                    <VideoItem key={doc.id} file={doc} downloadButton />
                ))}
            </Group>
        );
    }, [data.videos]);

    const renderDocuments = useMemo(() => {
        if (!data.documents.length) return null;

        return (
            <Flex direction="column" gap={16}>
                {data.documents.map((doc) => (
                    <FileItem key={doc.id} fileUrl={doc.absolutePath} fileName={doc.name} fileSize={doc.size} type="document" />
                ))}
            </Flex>
        );
    }, [data.documents]);

    return (
        <Flex className={classes.root}>
            <Heading sx={{ display: "flex", gap: 12, alignItems: "center" }}>
                <ThemeIcon color="secondary" sx={{ borderRadius: 56, height: 60, width: 60 }}>
                    <Paperclip height={28} width={28} />
                </ThemeIcon>
                Прикрепленные файлы
            </Heading>
            {renderVideos}
            {renderDocuments}
        </Flex>
    );
};

export default MaterialFiles;
