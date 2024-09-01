import { Accordion, Flex, FlexProps, AccordionProps as MAccordionProps, Skeleton, SkeletonProps, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import { Minus, Plus } from "react-feather";
import { useFaq } from "@entities/staticPage";
import { Heading, HeadingProps } from "@shared/ui";
import useStyles from "./AccordionList.styles";

export interface AccordionListProps extends Omit<MAccordionProps, "children" | "defaultValue"> {
    visible?: boolean;
    skeletonListProps?: SkeletonProps;
    skeletonTitleProps?: SkeletonProps;
    wrapperProps?: FlexProps;
    titleProps?: HeadingProps;
    isStatic?: boolean;
}

const AccordionList = ({
    title,
    visible,
    skeletonListProps,
    skeletonTitleProps,
    wrapperProps,
    titleProps,
    isStatic,
    ...props
}: AccordionListProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    const { data: faqData, isLoading, isError } = useFaq({ paginate: false, filter: { isStatic } }, visible);
    const { classes } = useStyles();
    const getChevron = (isOpen: boolean) => {
        if (isOpen) {
            return <Minus />;
        }
        return <Plus />;
    };

    const renderFaq = useMemo(
        () =>
            faqData?.map((faqItem) => (
                <Accordion.Item key={faqItem.id} value={faqItem.id.toString()}>
                    <Accordion.Control chevron={getChevron(selected.includes(faqItem.id.toString()))}>{faqItem.question}</Accordion.Control>
                    <Accordion.Panel>{faqItem.answer}</Accordion.Panel>
                </Accordion.Item>
            )),
        [faqData, selected]
    );

    if (isError) {
        return <Text>Произошла ошибка, попробуйте позднее</Text>;
    }

    if (!isLoading && !faqData.length) {
        return null;
    }

    return (
        <Flex {...wrapperProps} className={classes.faqContainer}>
            <Skeleton {...skeletonTitleProps} visible={isLoading}>
                <Flex direction="column" className={classes.titleContainer}>
                    <Heading {...titleProps} className={classes.title}>
                        Вопросы и ответы
                    </Heading>
                    <Heading {...titleProps} className={classes.description}>
                        Если у вас есть вопросы, вы всегда <br /> можете задать его нашим специалистам. <br /> Мы ответим максимально быстро
                    </Heading>
                </Flex>
            </Skeleton>
            <Skeleton visible={isLoading} {...skeletonListProps} width="100%" mih={90} style={{ flexGrow: 1 }}>
                <Accordion {...props} multiple variant="separated" value={selected} onChange={setSelected}>
                    {renderFaq}
                </Accordion>
            </Skeleton>
        </Flex>
    );
};

export default AccordionList;
