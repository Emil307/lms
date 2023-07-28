import { Flex } from "@mantine/core";
import { StaticReviewFromList } from "@entities/staticReview";
import { Button, Heading } from "@shared/ui";
import useStyles from "./Header.styles";
import { openVideo } from "@shared/utils/openVideo";

export interface HeaderProps {
    data: Pick<StaticReviewFromList, "content" | "video">;
}

const Header = ({ data }: HeaderProps) => {
    const { classes } = useStyles();

    const handleOpenVideo = () => {
        openVideo(data.video.absolutePath);
    };

    return (
        <Flex className={classes.root}>
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
