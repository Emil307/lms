import { Flex } from "@mantine/core";
import { StaticReviewFromList } from "@entities/staticReview";
import { Button, Heading } from "@shared/ui";
import useStyles from "./Header.styles";

export interface HeaderProps {
    data: Pick<StaticReviewFromList, "content" | "video">;
}

const Header = ({ data: { content } }: HeaderProps) => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root}>
            <Heading color="white" lineClamp={3}>
                {content}
            </Heading>
            {/* //TODO: смотреть отзыв с модалкой */}
            <Button variant="white" size="large" w="min-content">
                Смотреть отзыв
            </Button>
        </Flex>
    );
};

export default Header;
