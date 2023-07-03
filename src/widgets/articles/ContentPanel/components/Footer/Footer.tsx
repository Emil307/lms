import { Flex, Group, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { FavoriteButton, Rating } from "@features/articles";
import { Article } from "@entities/article";
import useStyles from "./Footer.styles";

export interface FooterProps {
    data: Article;
}

const Footer = ({ data }: FooterProps) => {
    const { classes } = useStyles();
    const isTablet = useMediaQuery("(max-width: 744px)");

    const variantFavoriteButton = isTablet ? "compact" : "default";

    return (
        <Group className={classes.root}>
            <Text className={classes.helperText}>Оцените статью:</Text>
            <Flex gap={8}>
                <Rating data={data} />
                <FavoriteButton data={data} variant={variantFavoriteButton} />
            </Flex>
        </Group>
    );
};

export default Footer;
