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
                    <VideoItem key={doc.id} file={doc} downloadButton w={192} videoStyle={{ width: 192, height: 120 }} />
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

    if (!data.documents.length && !data.videos.length) {
        return null;
    }

    return (
        <Flex className={classes.root}>
            <Flex className={classes.headingContainer}>
                <ThemeIcon className={classes.wrapperPaperclipIcon}>
                    <Paperclip height={28} width={28} />
                </ThemeIcon>
                <Heading>Прикрепленные файлы</Heading>
            </Flex>
            {renderVideos}
            {renderDocuments}
        </Flex>
    );
};

export default MaterialFiles;
