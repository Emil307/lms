import { Accordion, Flex, FlexProps, AccordionProps as MAccordionProps, Skeleton, SkeletonProps, Title } from "@mantine/core";
import { useMemo, useState } from "react";
import { Minus, Plus } from "react-feather";
import { useFaq } from "@entities/staticPage";

export interface AccordionListProps extends Omit<MAccordionProps, "children" | "defaultValue"> {
    title?: string;
    visible?: boolean;
    skeletonListProps?: SkeletonProps;
    wrapperProps?: FlexProps;
}

const AccordionList = ({ title, visible, skeletonListProps, wrapperProps, ...props }: AccordionListProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    const { data: faqData, isLoading } = useFaq(visible);

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
        [faqData, selected],
    );

    if (!faqData?.length) {
        return null;
    }

    return (
        <Flex direction="column" {...wrapperProps}>
            {title && (
                <Skeleton visible={isLoading} mih={40} radius={24}>
                    <Title order={1} color="dark">
                        {title}
                    </Title>
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
