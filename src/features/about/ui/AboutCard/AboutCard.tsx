import { Box, Flex, FlexProps } from "@mantine/core";
import Image from "next/image";
import { memo } from "react";
import { useRouter } from "next/router";
import { GetAboutResponse } from "@entities/staticPage";
import { Button, ContentByTextEditor, Heading, Paragraph } from "@shared/ui";
import useStyles from "./AboutCard.styles";

export interface AboutCardProps extends Omit<FlexProps, "children"> {
    data?: GetAboutResponse;
}

const MemoizedAboutCard = memo(function AboutCard({ data, className, ...props }: AboutCardProps) {
    const router = useRouter();
    const { classes, cx } = useStyles();

    const handleOpenCoursesPage = () => router.push("/courses");

    return (
        <Flex className={cx(classes.root, className)} {...props}>
            <Flex className={classes.contentSection}>
                <Heading order={2}>{data?.title}</Heading>
                <Button w="min-content" onClick={handleOpenCoursesPage}>
                    Подобрать курс
                </Button>
                <Paragraph variant="small-m" className={classes.shortContent}>
                    {data?.shortContent}
                </Paragraph>
                <ContentByTextEditor data={data?.fullContent} />
            </Flex>
            {data?.banner && (
                <Box className={classes.imageSection}>
                    <Image src={data.banner.absolutePath} alt={data.banner.name} fill className={classes.bannerImage} />
                </Box>
            )}
        </Flex>
    );
});

export default MemoizedAboutCard;
