import { Flex, Spoiler as MSpoiler, Stack, ThemeIcon } from "@mantine/core";
import { FieldArray } from "formik";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";
import { Button, Paragraph } from "@shared/ui";
import { CourseCategory, CourseTag } from "@entities/course";
import { FilterItem, FilterItemProps } from "./components";
import useStyles from "./FilterList.styles";

export interface FilterListProps {
    field: FilterItemProps["field"];
    filterName: string;
    data?: CourseTag[] | CourseCategory[];
}

const FilterList = ({ field, filterName, data }: FilterListProps) => {
    const [selectedFilterItemId, setSelectedFilterItemId] = useState<number | null>(null);
    const { classes } = useStyles();

    const handleChangeSelectFilterItem = (itemId: number | null) => setSelectedFilterItemId(itemId);

    const renderItems = useMemo(
        () => data?.map((item) => <FilterItem key={item.id} data={item} field={field} onChangeSelected={handleChangeSelectFilterItem} />),
        [data, selectedFilterItemId]
    );

    const showLabel = useMemo(
        () => (
            <Flex gap={8} mt={16}>
                <Button variant="text">Показать еще</Button>
                <ThemeIcon color="info" bg="info20" style={{ borderRadius: "50%", height: 24, width: 24 }}>
                    <ChevronDown width={12} height={12} />
                </ThemeIcon>
            </Flex>
        ),
        []
    );

    const hideLabel = useMemo(
        () => (
            <Flex gap={8} mt={16}>
                <Button variant="text">Свернуть</Button>
                <ThemeIcon color="info" bg="info20" style={{ borderRadius: "50%", height: 24, width: 24 }}>
                    <ChevronUp width={12} height={12} />
                </ThemeIcon>
            </Flex>
        ),
        []
    );

    if (!data?.length) {
        return null;
    }

    return (
        <FieldArray
            name={field}
            render={() => (
                <Stack spacing={16}>
                    <Paragraph variant="large" c="neutralMain50">
                        {filterName}
                    </Paragraph>
                    <MSpoiler classNames={classes} maxHeight={85} showLabel={showLabel} hideLabel={hideLabel} transitionDuration={0}>
                        <Flex wrap="wrap" gap={8} mb={1}>
                            {renderItems}
                        </Flex>
                    </MSpoiler>
                </Stack>
            )}></FieldArray>
    );
};

export default FilterList;
