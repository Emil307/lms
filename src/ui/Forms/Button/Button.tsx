import { Button as MButton, ButtonProps as MButtonProps } from "@mantine/core";
import { memo } from "react";
export interface ButtonProps extends MButtonProps {}

const MemoizedButton = memo(function Button(props: ButtonProps) {
    return <MButton {...props} />;
});

export default MemoizedButton;
