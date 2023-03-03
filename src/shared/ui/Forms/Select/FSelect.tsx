import React from "react";
import { useField } from "formik";
import Select, { SelectProps } from "./Select";

export interface FSelectProps extends SelectProps {
    name: string;
}

const FSelect = (props: FSelectProps) => {
    const [field, meta, helper] = useField(props.name);
    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);

    return <Select {...props} onChange={helper.setValue} onBlur={field.onBlur} value={field.value} name={field.name} error={error} />;
};

export default FSelect;
