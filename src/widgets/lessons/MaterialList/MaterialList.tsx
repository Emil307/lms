import { Flex, FlexProps, Group } from "@mantine/core";
import { useMemo } from "react";
import { EmptyData, FileItem, Heading, VideoItem } from "@shared/ui";
import { GetLessonResponse } from "@entities/lesson";
import IconEmptyBox from "@public/icons/emptyBox.svg";
import useStyles from "./MaterialList.styles";

export interface MaterialListProps extends Omit<FlexProps, "children"> {
    data: GetLessonResponse;
}

const MaterialList = ({ data, ...props }: MaterialListProps) => {
    const { classes } = useStyles();

    const videos = useMemo(() => {
        if (!data.videos.length) return null;

        return (
            <Group>
                {data.videos.map((doc) => (
                    <VideoItem key={doc.id} file={doc} downloadButton w={192} videoStyle={{ height: 120, width: 192 }} />
                ))}
            </Group>
        );
    }, [data.videos]);

    const documents = useMemo(() => {
        if (!data.files.length) return null;

        return (
            <Flex direction="column" gap={16}>
                {data.files.map((doc) => (
                    <FileItem key={doc.id} fileUrl={doc.absolutePath} fileName={doc.name} fileSize={doc.size} type="document" />
                ))}
            </Flex>
        );
    }, [data.files]);

    const emptyBlock = useMemo(() => {
        if (!videos && !documents) {
            return <EmptyData title="Материалы отсутствуют" description="" icon={<IconEmptyBox />} />;
        }
        return null;
    }, [videos, documents]);

    return (
        <Flex {...props} className={classes.root}>
            <Heading order={2}>Материалы урока</Heading>
            {emptyBlock}
            {videos}
            {documents}
        </Flex>
    );
};

export default MaterialList;
