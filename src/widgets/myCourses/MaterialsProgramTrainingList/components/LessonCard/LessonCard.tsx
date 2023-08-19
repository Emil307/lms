import { Badge, Flex, FlexProps, Group, ThemeIcon } from "@mantine/core";
import { Lock } from "react-feather";
import { memo, useMemo } from "react";
import { FileItem, Heading, Paragraph, VideoItem } from "@shared/ui";
import { GroupModuleLesson } from "@entities/group";
import useStyles from "./LessonCard.styles";

export interface LessonCardProps extends Omit<FlexProps, "children"> {
    data: GroupModuleLesson;
    moduleName: string;
    courseId?: number;
}

const MemoizedLessonCard = memo(function LessonCard({ data, moduleName, courseId, ...props }: LessonCardProps) {
    const { classes, cx } = useStyles({ status: data.lessonStatus.name });

    const isBlocked = data.lessonStatus.name === "blocked";

    const renderVideos = useMemo(() => {
        if (isBlocked || !data.videos.length) return null;

        return (
            <Group>
                {data.videos.map((doc) => (
                    <VideoItem key={doc.id} file={doc} downloadButton height={120} width={192} />
                ))}
            </Group>
        );
    }, [data.videos]);

    const renderDocuments = useMemo(() => {
        if (isBlocked || !data.files.length) return null;

        return (
            <Flex direction="column" gap={16}>
                {data.files.map((doc) => (
                    <FileItem key={doc.id} fileUrl={doc.absolutePath} fileName={doc.name} fileSize={doc.size} type="document" />
                ))}
            </Flex>
        );
    }, [data.files]);

    const renderStatus = () => {
        if (isBlocked) {
            return (
                <Badge className={classes.lockLessonInfo}>
                    <ThemeIcon className={classes.wrapperLockIcon}>
                        <Lock />
                    </ThemeIcon>
                    Нет доступа
                </Badge>
            );
        }
        return null;
    };

    return (
        <Flex {...props} className={cx(classes.root, props.className)}>
            <Flex direction="column" gap={24}>
                <Flex direction="column" gap={8}>
                    {renderStatus()}
                    <Flex direction="column" gap={2}>
                        <Heading order={3}>{data.name}</Heading>
                        <Paragraph variant="text-caption">{moduleName}</Paragraph>
                    </Flex>
                </Flex>
                {!isBlocked && (
                    <Paragraph variant="small-m" color="gray45">
                        {data.description}
                    </Paragraph>
                )}
            </Flex>
            {renderVideos}
            {renderDocuments}
        </Flex>
    );
});

export default MemoizedLessonCard;
