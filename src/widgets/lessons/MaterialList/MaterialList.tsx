import { Flex, FlexProps, Group } from "@mantine/core";
import { useMemo } from "react";
import { FileItem, Heading, VideoItem } from "@shared/ui";
import { GetLessonResponse } from "@entities/lesson";
import useStyles from "./MaterialList.styles";

export interface MaterialListProps extends Omit<FlexProps, "children"> {
    data?: GetLessonResponse;
}

const MaterialList = ({ data, ...props }: MaterialListProps) => {
    const { classes } = useStyles();

    const renderVideos = useMemo(() => {
        if (!data?.videos.length) return null;

        return (
            <Group>
                {data.videos.map((doc) => (
                    <VideoItem key={doc.id} file={doc} downloadButton height={120} width={192} />
                ))}
            </Group>
        );
    }, [data?.videos]);

    const renderDocuments = useMemo(() => {
        if (!data?.files.length) return null;

        return (
            <Flex direction="column" gap={16}>
                {data.files.map((doc) => (
                    <FileItem key={doc.id} fileUrl={doc.absolutePath} fileName={doc.name} fileSize={doc.size} type="document" />
                ))}
            </Flex>
        );
    }, [data?.files]);

    return (
        <Flex {...props} className={classes.root}>
            <Heading order={2}>Материалы</Heading>
            {renderVideos}
            {renderDocuments}
        </Flex>
    );
};

export default MaterialList;
