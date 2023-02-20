import React from "react";
import { ButtonProps } from "./Button";
import { Button } from ".";

interface ResetButtonProps extends ButtonProps {}

export default function FResetButton({ children }: ResetButtonProps) {
    return <Button type="reset">{children} </Button>;
}
