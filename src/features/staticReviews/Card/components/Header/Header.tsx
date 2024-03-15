import { Flex } from "@mantine/core";
import { useRef } from "react";
import { StaticReviewFromList } from "@entities/staticReview";
import { Button, Heading } from "@shared/ui";
import { openVideo } from "@shared/utils";
import useStyles from "./Header.styles";

export interface HeaderProps {
    data: Pick<StaticReviewFromList, "content" | "video">;
}

const Header = ({ data }: HeaderProps) => {
    const { classes } = useStyles();
    const ref = useRef<HTMLVideoElement | null>(null);

    const handleOpenVideo = () => {
        openVideo(ref.current);
    };

    return (
        <Flex className={classes.root}>
            <video ref={ref} className={classes.video} src={data.video.absolutePath} controls></video>
            <Heading color="white" lineClamp={3}>
                {data.content}
            </Heading>
            <Button variant="white" size="large" w="min-content" handleClick={handleOpenVideo}>
                Смотреть отзыв
            </Button>
        </Flex>
    );
};

export default Header;
