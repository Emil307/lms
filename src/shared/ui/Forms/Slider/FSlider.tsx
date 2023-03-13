import React, { useCallback } from "react";
import { useField } from "formik";
import Slider, { SliderProps } from "./Slider";

export interface FSliderProps extends SliderProps {
    name: string;
}

export default function FSlider({ name, onChange = () => undefined, ...props }: FSliderProps) {
    const [field, _meta, helpers] = useField(name);

    const handleOnChange = useCallback((newValue: number) => {
        onChange(newValue);
        helpers.setValue(newValue);
    }, []);

    return <Slider {...props} value={field.value} onChange={handleOnChange} />;
}
