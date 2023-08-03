import { Flex, Avatar, BoxProps } from "@mantine/core";
import { useMemo } from "react";
import { GetGroupResponse } from "@entities/group";
import { Heading, Paragraph } from "@shared/ui";
import AvatarIcon from "@public/icons/avatar.svg";
import useStyles from "./AuthorsInfo.styles";

export interface AuthorsInfoProps extends Omit<BoxProps, "children"> {
    data: GetGroupResponse;
}

const AuthorInfo = ({ data, ...props }: AuthorsInfoProps) => {
    const { classes } = useStyles();

    const titleAuthorInfo = data.authors.length > 1 ? "Авторы курса" : "Автор курса";

    const renderAuthors = useMemo(
        () =>
            data.authors.map((author, index) => {
                const fullName = [author.lastName, author.firstName, author.patronymic].join(" ");
                return (
                    <Flex key={index} className={classes.authorCard}>
                        <Avatar src={data.cover.absolutePath} className={classes.avatarWrapper} alt={data.cover.name} radius={50}>
                            <AvatarIcon />
                        </Avatar>
                        <Flex direction="column" gap={4}>
                            <Paragraph variant="small-semi">{fullName}</Paragraph>
                            <Paragraph variant="text-small-m" color="gray45">
                                {author.description}
                            </Paragraph>
                        </Flex>
                    </Flex>
                );
            }),
        [data.authors]
    );

    return (
        <Flex {...props} className={classes.root}>
            <Flex className={classes.headingContainer}>
                <Heading order={2}>{titleAuthorInfo}</Heading>
                <Paragraph variant="small-m" lineClamp={2}>
                    Только профессионалы в своем деле.
                </Paragraph>
            </Flex>
            <Flex className={classes.authorWrapperList}>{renderAuthors}</Flex>
        </Flex>
    );
};

export default AuthorInfo;