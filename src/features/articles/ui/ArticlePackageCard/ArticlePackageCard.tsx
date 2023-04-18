import { Card as MCard, CardProps as MCardProps, Text } from "@mantine/core";
import { memo, ReactNode } from "react";
import { ArticlePackage } from "@entities/article";
import { Footer, Header } from "./components";
import useStyles from "./ArticlePackageCard.styles";

export interface ArticlePackageCardProps extends Omit<MCardProps, "children"> {
    data: ArticlePackage;
    children: ({ data }: { data: ArticlePackage }) => ReactNode;
}

const MemoizedArticlePackageCard = memo(function ArticlePackageCard({ data, children, ...props }: ArticlePackageCardProps) {
    const { classes } = useStyles();

    return (
        <MCard {...props} className={classes.root}>
            <Header data={data} />
            <MCard.Section className={classes.section}>
                <Text>Содержание:</Text>
                {children({ data })}
            </MCard.Section>
            <Footer data={data} />
        </MCard>
    );
});

export default MemoizedArticlePackageCard;
