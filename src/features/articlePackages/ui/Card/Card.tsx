import { Flex, FlexProps } from "@mantine/core";
import { memo, ReactNode } from "react";
import { ArticlePackageFromList } from "@entities/articlePackage";
import { Paragraph } from "@shared/ui";
import { Footer, Header } from "./components";
import useStyles from "./Card.styles";

export interface CardProps extends Omit<FlexProps, "children"> {
    data: ArticlePackageFromList;
    children: ({ data }: { data: ArticlePackageFromList }) => ReactNode;
}

const MemoizedCard = memo(function Card({ data, children, ...props }: CardProps) {
    const { classes } = useStyles();

    return (
        <Flex {...props} className={classes.root}>
            <Header data={data} />
            <Flex className={classes.contentSectionWrapper}>
                <Paragraph variant="text-small-m" color="gray45">
                    Содержание:
                </Paragraph>
                {children({ data })}
            </Flex>
            <Footer data={data} />
        </Flex>
    );
});

export default MemoizedCard;
