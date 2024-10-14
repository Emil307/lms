import { ButtonProps, Flex, FlexProps } from "@mantine/core";
import { Button } from "@shared/ui";
import { useMedia } from "@shared/utils";
import useStyles from "./ControlButtons.styles";

export interface ControlButtonsProps extends Omit<FlexProps, "children"> {
    submitButtonText?: string;
    cancelButtonText?: string;
    isLoading?: boolean;
    gap?: number;
    ignoreDirty?: boolean;
    variant?: "default" | "modal" | "modalTable";
    disabledSubmit?: boolean;
    cancelButtonProps?: Omit<ButtonProps, "children">;
    onSubmit?: () => void;
    onClose?: () => void;
}

const ControlButtons = ({
    submitButtonText = "Сохранить",
    cancelButtonText = "Отменить",
    isLoading,
    gap = 8,
    disabledSubmit = false,
    variant = "default",
    cancelButtonProps,
    onSubmit,
    onClose,
    ...props
}: ControlButtonsProps) => {
    const { classes, cx } = useStyles({ variant });

    const isMediumSize = useMedia("sm");

    return (
        <Flex {...props} className={cx(classes.root, props.className)} gap={gap}>
            {!!onClose && (
                <Button
                    {...cancelButtonProps}
                    variant="border"
                    size={isMediumSize ? "medium" : "large"}
                    onClick={onClose}
                    disabled={isLoading}
                    w="100%">
                    {cancelButtonText}
                </Button>
            )}
            <Button
                type="submit"
                variant="primary"
                size={isMediumSize ? "medium" : "large"}
                loading={isLoading}
                disabled={disabledSubmit}
                onClick={onSubmit}
                w="100%">
                {submitButtonText}
            </Button>
        </Flex>
    );
};

export default ControlButtons;
