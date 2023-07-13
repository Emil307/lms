import { Accordion, Flex, FlexProps, AccordionProps as MAccordionProps, Skeleton, SkeletonProps, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import { Minus, Plus } from "react-feather";
import { useFaq } from "@entities/staticPage";
import { Heading } from "@shared/ui";

export interface AccordionListProps extends Omit<MAccordionProps, "children" | "defaultValue"> {
    title?: string;
    visible?: boolean;
    skeletonListProps?: SkeletonProps;
    wrapperProps?: FlexProps;
}

const AccordionList = ({ title, visible, skeletonListProps, wrapperProps, ...props }: AccordionListProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    const { data: faqData, isLoading, isError } = useFaq(visible);

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

    if (!faqData?.length) {
        return null;
    }

    return (
        <Flex direction="column" {...wrapperProps}>
            {title && (
                <Skeleton visible={isLoading} mih={40} radius={24}>
                    <Heading order={3}>{title}</Heading>
                </Skeleton>
            )}
            <Skeleton visible={isLoading} {...skeletonListProps}>
                <Accordion {...props} multiple variant="separated" value={selected} onChange={setSelected}>
                    {renderFaq}
                </Accordion>
            </Skeleton>
        </Flex>
    );
};

export default AccordionList;
