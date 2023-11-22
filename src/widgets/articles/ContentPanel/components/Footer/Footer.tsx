import { Flex, Group } from "@mantine/core";
import { FavoriteButton, Rating } from "@features/articles";
import { Article } from "@entities/article";
import { Paragraph } from "@shared/ui";
import { useMedia } from "@shared/utils";
import { ArticleTypes } from "@shared/constant";
import useStyles from "./Footer.styles";

export interface FooterProps {
    data: Article;
    articleType?: ArticleTypes;
    categoryId?: string;
}

const Footer = ({ data, articleType, categoryId }: FooterProps) => {
    const { classes } = useStyles();
    const isTablet = useMedia("sm");

    const variantFavoriteButton = isTablet ? "compact" : "default";

    return (
        <Group className={classes.root}>
            <Paragraph variant="small-m">Оцените статью:</Paragraph>
            <Flex gap={8}>
                <Rating data={data} />
                <FavoriteButton data={data} variant={variantFavoriteButton} articleType={articleType} categoryId={categoryId} />
            </Flex>
        </Group>
    );
};

export default Footer;
