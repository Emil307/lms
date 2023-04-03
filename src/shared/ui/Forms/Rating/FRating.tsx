import React, { useCallback } from "react";
import { useField } from "formik";
import Rating, { RatingProps } from "./Rating";

export interface FRatingProps extends RatingProps {
    name: string;
}

export default function FRating({ onChange = () => undefined, ...props }: FRatingProps) {
    const [field, meta, helpers] = useField(props.name);
    const error = React.useMemo(() => (meta.touched && meta.error) || null, [meta.error, meta.touched]);

    const handleChange = useCallback((newValue: number) => {
        onChange(newValue);
        helpers.setValue(newValue);
    }, []);

    return <Rating {...props} value={field.value} onChange={handleChange} error={error} />;
}
