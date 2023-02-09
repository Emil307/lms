import React from "react";
import { Button } from ".";
import { ButtonProps } from "./Button";

interface ResetButtonProps extends ButtonProps {}

export default function FResetButton({ children }: ResetButtonProps) {
    return <Button type="reset">{children} </Button>;
}
