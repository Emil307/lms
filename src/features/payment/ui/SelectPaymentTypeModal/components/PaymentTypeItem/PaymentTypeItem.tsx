import { useField } from "formik";
import { Box } from "@mantine/core";
import { Radio } from "@shared/ui";
import useStyles from "./PaymentTypeItem.styles";
import { PaymentType } from "../../types";

interface PaymentTypeItemProps {
    data: PaymentType;
}

const PaymentTypeItem = ({ data }: PaymentTypeItemProps) => {
    const { classes } = useStyles();
    const [field, _meta, helpers] = useField("paymentType");

    const renderDescription = () => {
        if (field.value !== data.value) {
            return;
        }
        return data.description;
    };

    const handleClickWrapper = () => {
        if (field.value === data.value) {
            return;
        }

        helpers.setValue(data.value);
    };

    return (
        <Box onClick={handleClickWrapper}>
            <Radio
                size="md"
                labelPosition="left"
                label={data.title}
                value={data.value}
                description={renderDescription()}
                className={classes.root}
            />
        </Box>
    );
};

export default PaymentTypeItem;
