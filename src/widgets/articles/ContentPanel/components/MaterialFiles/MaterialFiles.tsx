import { Flex, Group, ThemeIcon, Title } from "@mantine/core";
import { Paperclip } from "react-feather";
import { useMemo } from "react";
import { FileItem } from "@shared/ui";
import { getFileSize } from "@shared/utils";
import { GetArticleResponse } from "@entities/article";
import useStyles from "./MaterialFiles.styles";
import { VideoItem } from "../VideoItem";

export interface MaterialFilesProps {
    data: Pick<GetArticleResponse, "files">;
}

const MaterialFiles = ({ data }: MaterialFilesProps) => {
    const { classes } = useStyles();

    const downloadFile = () => undefined;

    //TODO: Править списки файлов как бек поправит
    const renderVideos = useMemo(
        () =>
            data.files.map((doc) => (
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
            data.files.map((doc) => (
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

export default MaterialFiles;
