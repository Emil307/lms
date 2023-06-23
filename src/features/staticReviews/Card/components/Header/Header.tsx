import { Flex, Title } from "@mantine/core";
import { StaticReviewFromList } from "@entities/staticReview";
import { Button } from "@shared/ui";
import useStyles from "./Header.styles";

export interface HeaderProps {
    data: Pick<StaticReviewFromList, "content" | "video">;
}

const Header = ({ data: { content } }: HeaderProps) => {
    const { classes } = useStyles();

    return (
        <Flex className={classes.root}>
            <Title order={1} color="white" lineClamp={3}>
                {content}
            </Title>
            {/* //TODO: смотреть отзыв с модалкой */}
            <Button variant="white" size="large" w="min-content">
                Смотреть отзыв
            </Button>
        </Flex>
    );
};

export default Header;
