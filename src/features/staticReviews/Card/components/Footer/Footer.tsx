import { Text, Flex, Avatar, ThemeIcon } from "@mantine/core";
import { StaticReviewFromList } from "@entities/staticReview";
import AvatarIcon from "@public/icons/avatar.svg";
import useStyles from "./Footer.styles";

export interface FooterProps {
    data: StaticReviewFromList;
}

const Footer = ({ data }: FooterProps) => {
    const { classes } = useStyles();

    const authorFullName = [data.firstName, data.lastName].join(" ");

    return (
        <Flex className={classes.root}>
            <Text className={classes.authorShortQuote}>{data.quote}</Text>
            <Flex gap={8}>
                <Avatar
                    src={data.authorAvatar?.absolutePath}
                    alt="avatar"
                    w={44}
                    h={44}
                    miw={44}
                    radius={160}
                    styles={(theme) => ({
                        placeholder: { backgroundColor: theme.colors.grayLight[0] },
                    })}>
                    <ThemeIcon variant="outline" className={classes.avatarDefaultIconWrapper}>
                        <AvatarIcon />
                    </ThemeIcon>
                </Avatar>
                <Flex direction="column" gap={2}>
                    <Text className={classes.authorFullName}>{authorFullName}</Text>
                    <Text className={classes.authorPosition}>{data.position}</Text>
                </Flex>
            </Flex>
        </Flex>
    );
};

export default Footer;
