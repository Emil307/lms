import { Avatar, Box, Flex, ThemeIcon } from "@mantine/core";
import { HomeworkAnswer } from "@entities/lesson";
import AvatarIcon from "public/icons/avatar.svg";
import { ContentByTextEditor, FileItem, Paragraph } from "@shared/ui";
import { getFullName } from "@shared/utils";
import useStyles from "./StudentAnswerDetails.styles";
import { getFormatUpdatedAt } from "./utils";

export interface StudentAnswerDetailsProps {
    data: HomeworkAnswer | null;
}

const StudentAnswerDetails = ({ data }: StudentAnswerDetailsProps) => {
    const { classes } = useStyles();

    if (!data) {
        return null;
    }

    const renderDocuments = () => {
        if (!data.files.length) {
            return null;
        }

        return (
            <Flex className={classes.documentListWrapper}>
                {data.files.map((doc) => (
                    <FileItem key={doc.id} fileUrl={doc.absolutePath} fileName={doc.name} fileSize={doc.size} type="document" />
                ))}
            </Flex>
        );
    };

    return (
        <Box className={classes.root}>
            <Avatar src={data.student.profile.avatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                    <AvatarIcon />
                </ThemeIcon>
            </Avatar>
            <Flex className={classes.answerTextHeadingContainer}>
                <Paragraph variant="text-caption" color="gray45">
                    {getFullName({ data: data.student.profile })}
                </Paragraph>
                <Paragraph variant="text-caption" color="gray45" sx={{ whiteSpace: "nowrap" }}>
                    {getFormatUpdatedAt(data.updatedAt)}
                </Paragraph>
            </Flex>
            <ContentByTextEditor data={data.answer} className={classes.answerContent} />

            {renderDocuments()}
        </Box>
    );
};

export default StudentAnswerDetails;
