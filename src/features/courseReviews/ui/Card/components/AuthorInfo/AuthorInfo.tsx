import { Avatar, Flex, FlexProps } from "@mantine/core";
import dayjs from "dayjs";
import { CourseReviewFromList } from "@entities/courseReview";
import AvatarIcon from "public/icons/avatar.svg";
import { Heading, Paragraph } from "@shared/ui";
import { getFullName } from "@shared/utils";

export interface AuthorInfoProps extends FlexProps {
    data: CourseReviewFromList;
}

const AuthorInfo = ({ data, ...props }: AuthorInfoProps) => {
    const userFullName = getFullName({ data: data.user.profile });

    return (
        <Flex align="center" gap={16} {...props}>
            <Avatar
                src={data.user.profile.avatar?.absolutePath}
                alt="avatar"
                w={64}
                h={64}
                radius={50}
                styles={(theme) => ({ placeholder: { backgroundColor: theme.colors.grayLight[0] } })}>
                <AvatarIcon />
            </Avatar>
            <Flex direction="column" gap={4}>
                <Heading order={4} lineClamp={1}>
                    {userFullName}
                </Heading>
                <Paragraph variant="text-small-m" color="gray45">
                    {dayjs(data.createdAt).format("D MMMM YYYY HH:mm")}
                </Paragraph>
            </Flex>
        </Flex>
    );
};

export default AuthorInfo;
