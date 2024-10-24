import { Box, Flex } from "@mantine/core";
import { memo, useEffect, useState } from "react";
import { useField } from "formik";
import useStyles from "./PriceRangeInput.styles";
import { IndexNumbers } from "./types";
import { normalizeRange } from "./utils";
import { Input } from "../Input";

interface PriceRangeInputProps {
    name: string;
    min: number;
    max: number;
    maxLengthPrice?: number;
    shouldNormalizeRange?: boolean;
}

const MemoizedPriceRangeInput = memo(function PriceRangeInput({
    name,
    min = 0,
    max = 1_000_000_000,
    maxLengthPrice = 15,
    shouldNormalizeRange = true,
}: PriceRangeInputProps) {
    const [field, _meta, helpers] = useField(name);
    const { classes } = useStyles();
    const [values, setValues] = useState<IndexNumbers>([min, max]);

    useEffect(() => {
        updateValues(getValidValues([field.value?.[0], field.value?.[1]], min, max));
    }, []);

    const handleBlur = () => {
        if (!shouldNormalizeRange) {
            return;
        }
        const [from, to] = getValidValues(values, min, max);

        const normalizedRange = normalizeRange([from, to], min, max);

        updateValues(normalizedRange);
    };

    const getValidValues = ([from, to]: IndexNumbers, minVal: number, maxVal: number): [number, number] => [
        from || from === 0 ? Number(from) : minVal,
        to || to === 0 ? Number(to) : maxVal,
    ];

    const updateValues = (value: [number, number]) => {
        setValues(value);
        helpers.setValue(value.map((x) => x.toString()));
    };

    return (
        <Box>
            <Flex gap={4} justify="space-between">
                <Input
                    className={classes.priceInput}
                    label="от"
                    onChange={(value) => setValues((prev) => [value ? Number(value) : "", prev[1]])}
                    value={values[0] !== "" ? values[0].toString() : ""}
                    maxLength={maxLengthPrice}
                    onBlur={handleBlur}
                />
                <Input
                    className={classes.priceInput}
                    label="до"
                    onChange={(value) => setValues((prev) => [prev[0], value ? Number(value) : ""])}
                    value={values[1] !== "" ? values[1].toString() : ""}
                    maxLength={maxLengthPrice}
                    onBlur={handleBlur}
                />
            </Flex>
        </Box>
    );
});

export default MemoizedPriceRangeInput;
