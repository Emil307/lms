import { Box, Flex, TextInput } from "@mantine/core";
import { memo, useCallback, useState } from "react";
import { useField } from "formik";
import { IndexNumbers, onChangeInput } from "@shared/ui/Forms/PriceRangeInput/utils";
import useStyles from "./PriceRangeInput.styles";

interface PriceRangeInputProps {
    name: string;
    min: number;
    max: number;
}

const MemoizedPriceRangeInput = memo(function PriceRangeInput({ name, min, max }: PriceRangeInputProps) {
    const [_field, _meta, helpers] = useField(name);
    const { classes } = useStyles();
    const [values, setValues] = useState<IndexNumbers>([min || 0, max || ""]);

    const handleOnChange = useCallback((newValue: number[]) => {
        helpers.setValue(newValue);
    }, []);
    const handleTextInputChange = onChangeInput(values, min, max, setValues, handleOnChange);

    return (
        <Box>
            <Flex gap={4} justify="space-between">
                <TextInput
                    className={classes.priceInput}
                    label="от"
                    onChange={handleTextInputChange(0)}
                    value={values[0] !== "" ? values[0].toString() : ""}
                />
                <TextInput
                    className={classes.priceInput}
                    label="до"
                    onChange={handleTextInputChange(1)}
                    value={values[1] !== "" ? values[1].toString() : ""}
                />
            </Flex>
        </Box>
    );
});

export default MemoizedPriceRangeInput;
