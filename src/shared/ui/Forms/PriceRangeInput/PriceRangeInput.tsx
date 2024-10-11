import { Box, Flex } from "@mantine/core";
import { memo, useCallback, useState } from "react";
import { useField } from "formik";
import { IndexNumbers, normalizeRange, onChangeInput } from "@shared/ui/Forms/PriceRangeInput/utils";
import useStyles from "./PriceRangeInput.styles";
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
    const [_field, _meta, helpers] = useField(name);
    const { classes } = useStyles();
    const [values, setValues] = useState<IndexNumbers>([min, max]);

    const handleOnChange = useCallback((newValue: number[]) => {
        helpers.setValue(newValue);
    }, []);

    const handleTextInputChange = onChangeInput(values, min, max, setValues, handleOnChange);

    const handleBlur = () => {
        if (!shouldNormalizeRange) {
            return;
        }
        const [from, to] = values;
        const startValue = from ? Number(from) : min;
        const endValue = to ? Number(to) : max;
        const normalizedRange = normalizeRange([startValue, endValue], min, max);

        setValues(normalizedRange);
        helpers.setValue(normalizedRange);
    };

    return (
        <Box>
            <Flex gap={4} justify="space-between">
                <Input
                    className={classes.priceInput}
                    label="от"
                    onChange={handleTextInputChange(0)}
                    value={values[0] !== "" ? values[0].toString() : ""}
                    maxLength={maxLengthPrice}
                    onBlur={handleBlur}
                />
                <Input
                    className={classes.priceInput}
                    label="до"
                    onChange={handleTextInputChange(1)}
                    value={values[1] !== "" ? values[1].toString() : ""}
                    maxLength={maxLengthPrice}
                    onBlur={handleBlur}
                />
            </Flex>
        </Box>
    );
});

export default MemoizedPriceRangeInput;
