import { Flex, Group, Text } from "@mantine/core";
import { ThumbsDown, ThumbsUp } from "react-feather";
import { FavoriteButton } from "@features/articles";
import { Button } from "@shared/ui";
import useStyles from "./Footer.styles";

export interface FooterProps {
    data: {
        likesCount: number;
        dislikesCount: number;
        isFavorite: boolean;
    };
}

const Footer = ({ data }: FooterProps) => {
    const { classes } = useStyles();
    return (
        <Group className={classes.root}>
            <Text className={classes.helperText}>Оцените статью:</Text>
            <Flex gap={8}>
                <Button className={classes.reactionButton} variant="text" leftIcon={<ThumbsUp />}>
                    {data.likesCount}
                </Button>
                <Button className={classes.reactionButton} variant="text" leftIcon={<ThumbsDown />}>
                    {data.dislikesCount}
                </Button>
                <FavoriteButton isFavorite={data.isFavorite} />
            </Flex>
        </Group>
    );
};

export default Footer;
