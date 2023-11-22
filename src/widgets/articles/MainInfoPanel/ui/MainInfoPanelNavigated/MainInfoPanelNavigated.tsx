import { Flex, FlexProps, ThemeIcon } from "@mantine/core";
import { FileText } from "react-feather";
import { ArticleWithMeta } from "@entities/article";
import { FavoriteButton, Rating } from "@features/articles";
import { Heading, Paragraph } from "@shared/ui";
import { useMedia } from "@shared/utils";
import { ArticleTypes } from "@shared/constant";
import { Pagination, TagList } from "./components";
import useStyles from "./MainInfoPanelNavigated.styles";

export interface MainInfoPanelNavigatedProps extends Omit<FlexProps, "children"> {
    articleData: ArticleWithMeta;
    type: Exclude<ArticleTypes, ArticleTypes.BY_COURSE>;
}

const MainInfoPanelNavigated = ({ articleData: { data, meta }, type, ...props }: MainInfoPanelNavigatedProps) => {
    const { classes } = useStyles();

    const isTablet = useMedia("sm");

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
                    <FavoriteButton data={data} variant={variantFavoriteButton} articleType={type} />
                </Flex>
            </Flex>
            <TagList data={data.tags} />
            <Pagination meta={meta} type={type} />
        </Flex>
    );
};

export default MainInfoPanelNavigated;
