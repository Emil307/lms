import { Flex, Avatar, ThemeIcon } from "@mantine/core";
import { StaticReviewFromList } from "@entities/staticReview";
import AvatarIcon from "@public/icons/avatar.svg";
import { Paragraph } from "@shared/ui";
import useStyles from "./AuthorInfoCard.styles";

export interface AuthorInfoCardProps {
    data: StaticReviewFromList;
}

const AuthorInfoCard = ({ data }: AuthorInfoCardProps) => {
    const { classes } = useStyles();

    if (!data.firstName) {
        return null;
    }

    const authorFullName = [data.firstName, data.lastName].join(" ");

    return (
        <Flex className={classes.root}>
            <Paragraph variant="text-small-m" className={classes.shortQuote}>
                {data.quote}
            </Paragraph>
            <Flex gap={8}>
                <Avatar src={data.authorAvatar?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                    <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                        <AvatarIcon />
                    </ThemeIcon>
                </Avatar>
                <Flex direction="column" justify="center" gap={2}>
                    <Paragraph variant="text-small-semi" className={classes.authorFullName}>
                        {authorFullName}
                    </Paragraph>
                    <Paragraph variant="text-caption" className={classes.authorPosition}>
                        {data.position}
                    </Paragraph>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default AuthorInfoCard;
