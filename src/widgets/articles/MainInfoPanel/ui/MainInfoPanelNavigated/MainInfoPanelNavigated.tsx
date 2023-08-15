import { Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { FileText } from "react-feather";
import { useMediaQuery } from "@mantine/hooks";
import { ArticleWithMeta } from "@entities/article";
import { FavoriteButton, Rating } from "@features/articles";
import { Heading, Paragraph } from "@shared/ui";
import { Pagination, TagList } from "./components";
import useStyles from "./MainInfoPanelNavigated.styles";

export interface MainInfoPanelNavigatedProps extends Omit<FlexProps, "children"> {
    articleData: ArticleWithMeta;
    type: "favorite" | "my-articles" | "by-category";
}

const MainInfoPanelNavigated = ({ articleData: { data, meta }, type, ...props }: MainInfoPanelNavigatedProps) => {
    const { classes } = useStyles();

    const isTablet = useMediaQuery("(max-width: 744px)");

    const variantFavoriteButton = isTablet ? "compact" : "default";

    return (
        <Flex {...props} className={classes.root}>
            <Flex className={classes.contentContainer}>
                <Flex className={classes.headingContainer}>
                    <ThemeIcon className={classes.wrapperDocumentIcon}>
                        <FileText width={26} height={26} />
                    </ThemeIcon>
                    <Flex direction="column" gap={4}>
                        <Heading>{data.name}</Heading>
                        <Paragraph variant="text-small-m">{data.category?.name}</Paragraph>
                    </Flex>
                </Flex>
                <Flex gap={8}>
                    <Rating data={data} />
                    <FavoriteButton data={data} variant={variantFavoriteButton} />
                </Flex>
            </Flex>
            <TagList data={data.tags} />
            <Pagination meta={meta} type={type} />
        </Flex>
    );
};

export default MainInfoPanelNavigated;
