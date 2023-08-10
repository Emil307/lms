import { Avatar, Flex, ThemeIcon } from "@mantine/core";
import { Paragraph } from "@shared/ui";
import AvatarIcon from "@public/icons/avatar.svg";
import { GetMainBannerResponse } from "@entities/staticPage";
import useStyles from "./AuthorInfoCard.styles";

export interface AuthorInfoCardProps {
    data?: GetMainBannerResponse;
}

const AuthorInfoCard = ({ data }: AuthorInfoCardProps) => {
    const { classes } = useStyles();

    const authorFullName = [data?.authorFirstName, data?.authorLastName].join(" ");

    if (!data?.authorActive) {
        return null;
    }

    return (
        <Flex className={classes.root}>
            <Paragraph variant="text-small-m" className={classes.shortQuote}>
                {data.authorShortQuote}
            </Paragraph>
            <Flex gap={8}>
                <Avatar src={data.authorImage?.absolutePath} alt="avatar" className={classes.avatarWrapper}>
                    <ThemeIcon className={classes.avatarDefaultIconWrapper}>
                        <AvatarIcon />
                    </ThemeIcon>
                </Avatar>
                <Flex direction="column" gap={2}>
                    <Paragraph variant="text-small-semi" className={classes.authorFullName}>
                        {authorFullName}
                    </Paragraph>
                    <Paragraph variant="text-caption" className={classes.authorAbout}>
                        {data.authorAbout}
                    </Paragraph>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default AuthorInfoCard;
