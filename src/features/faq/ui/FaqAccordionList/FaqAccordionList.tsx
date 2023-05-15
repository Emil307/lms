import { Accordion, AccordionProps as MAccordionProps, Loader } from "@mantine/core";
import { useMemo, useState } from "react";
import { Minus, Plus } from "react-feather";
import { useFaq } from "@entities/staticPage";

export interface FaqAccordionListProps extends Omit<MAccordionProps, "children" | "defaultValue"> {}

const FaqAccordionList = (props: FaqAccordionListProps) => {
    const [selected, setSelected] = useState<string[]>([]);
    const { data: faqData, isLoading } = useFaq();

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

    return (
        <Accordion {...props} multiple variant="separated" value={selected} onChange={setSelected}>
            {isLoading && <Loader sx={{ display: "flex", marginInline: "auto" }} />}
            {renderFaq}
        </Accordion>
    );
};

export default FaqAccordionList;
