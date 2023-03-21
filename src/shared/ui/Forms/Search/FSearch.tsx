import React from "react";
import { useField } from "formik";
import Search, { SearchProps } from "./Search";

export interface FSearchProps extends SearchProps {
    name: string;
}

const FSearch = (props: FSearchProps) => {
    const [field, meta, helper] = useField(props.name);
    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);

    return <Search {...props} name={props.name} value={field.value} setValue={helper.setValue} error={error} />;
};

export default FSearch;
