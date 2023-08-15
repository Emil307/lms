import { Card as MCard, CardProps as MCardProps } from "@mantine/core";
import { memo, ReactNode } from "react";
import { ArticlePackageFromList } from "@entities/articlePackage";
import { Paragraph } from "@shared/ui";
import { Footer, Header } from "./components";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<MCardProps, "children"> {
    data: ArticlePackageFromList;
    children: ({ data }: { data: ArticlePackageFromList }) => ReactNode;
}

const MemoizedCard = memo(function Card({ data, children, ...props }: CardProps) {
    const { classes } = useStyles();

    return (
        <MCard {...props} className={classes.root}>
            <Header data={data} />
            <MCard.Section className={classes.section}>
                <Paragraph variant="text-small-m" color="gray45">
                    Содержание:
                </Paragraph>
                {children({ data })}
            </MCard.Section>
            <Footer data={data} />
        </MCard>
    );
});

export default MemoizedCard;
