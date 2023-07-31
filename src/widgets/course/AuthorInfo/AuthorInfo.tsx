import { Flex, Text, Avatar, BoxProps } from "@mantine/core";
import { memo } from "react";
import { GetCourseResponse } from "@entities/course";
import { Heading } from "@shared/ui";
import useStyles from "./AuthorInfo.styles";

export interface AuthorInfoProps extends Omit<BoxProps, "children"> {
    data: GetCourseResponse;
}

const MemoizedAuthorInfo = memo(function AuthorInfo({ data, ...props }: AuthorInfoProps) {
    const { classes } = useStyles();
    return (
        <Flex {...props} className={classes.root}>
            <Flex direction="column" justify="center" sx={{ flex: 1, gap: 8 }}>
                <Heading order={2}>Автор курса</Heading>
                <Text className={classes.slogan} lineClamp={2}>
                    Только профессионалы в своем деле.
                </Text>
            </Flex>
            <Flex align="center" sx={{ flex: 2, gap: 24 }}>
                <Avatar src={data.cover?.absolutePath} alt="avatar" w={84} h={84} mih={84} miw={84} radius={50} />
                <Flex direction="column" gap={4}>
                    <Text className={classes.authorName}>Кремышева Виктория</Text>
                    <Text className={classes.authorDescription}>
                        Omni лидер в Аскона. В управлении уже 13 лет: раньше руководил ecom-проектом в Леруа Мерлен и запускал собственный
                        бизнес. Управляет командами от 3 до 500 человек.
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
});

export default MemoizedAuthorInfo;
