import { useFormikContext } from "formik";
import { ControlButtons, ControlButtonsProps, useFormSubmittingContext } from "@shared/ui";

export interface FControlButtonsProps extends ControlButtonsProps {
    ignoreDirty?: boolean;
}

const FControlButtons = ({ ignoreDirty, isLoading, ...props }: FControlButtonsProps) => {
    const isSubmitting = useFormSubmittingContext();
    const formikContext = useFormikContext();

    const loading = isLoading ?? isSubmitting;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const isDirtyForm = formikContext ? formikContext.dirty : true;

    // const

    return <ControlButtons {...props} disabledSubmit={!isDirtyForm && !ignoreDirty} isLoading={loading} />;
};

export default FControlButtons;
