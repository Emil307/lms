import { useFormikContext } from "formik";
import { useEffect } from "react";

export interface DetectorFormUpdateProps {
    onChange: () => void;
}

export default function DetectorFormUpdate({ onChange }: DetectorFormUpdateProps) {
    const { values } = useFormikContext();

    useEffect(() => {
        onChange();
    }, [values]);

    return <></>;
}
