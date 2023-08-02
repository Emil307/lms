import { ActionIcon, Avatar, Box, Flex, ThemeIcon } from "@mantine/core";
import { Edit3 } from "react-feather";
import { HomeworkAnswer } from "@entities/lesson";
import AvatarIcon from "public/icons/avatar.svg";
import { ContentByTextEditor, FileItem, Paragraph } from "@shared/ui";
import { getFullName } from "@shared/utils";
import useStyles from "./StudentAnswerDetails.styles";
import { getFormatUpdatedAt } from "./utils";

export interface StudentAnswerDetailsProps {
    data: HomeworkAnswer;
    openUpdateLessonHomeworkAnswerForm: () => void;
}

const StudentAnswerDetails = ({ data, openUpdateLessonHomeworkAnswerForm }: StudentAnswerDetailsProps) => {
    const { classes } = useStyles();

    const renderDocuments = () => {
        if (!data.files.length) {
            return null;
        }

        return (
            <Flex direction="column" gap={16} mt={24}>
                {data.files.map((doc) => (
                    <FileItem key={doc.id} fileUrl={doc.absolutePath} fileName={doc.name} fileSize={doc.size} type="document" />
                ))}
            </Flex>
        );
    };

    return (
        <Flex className={classes.root}>
            <Avatar src={data.student.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper} radius={50}>
                <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                    <AvatarIcon />
                </ThemeIcon>
            </Avatar>
            <Box sx={{ flex: 1 }}>
                <Flex direction="column" gap={8}>
                    <Flex gap={6}>
                        <Paragraph variant="text-caption" color="gray45">
                            {getFullName({ data: data.student.profile })}
                        </Paragraph>
                        <Paragraph variant="text-caption" color="gray45">
                            {getFormatUpdatedAt(data.updatedAt)}
                        </Paragraph>
                    </Flex>
                    <ContentByTextEditor data={data.answer} />
                </Flex>
                {renderDocuments()}
            </Box>
            {data.status.name === "onReview" && (
                <ActionIcon className={classes.editActionIcon} onClick={openUpdateLessonHomeworkAnswerForm}>
                    <Edit3 size={18} />
                </ActionIcon>
            )}
        </Flex>
    );
};

export default StudentAnswerDetails;
