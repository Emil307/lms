import React, { useState } from "react";
import { Button, Stack } from "@mantine/core";
import { Target } from "react-feather";
import * as Yup from "yup";
import { FormikConfig } from "formik";
import { FInput, Input } from "@shared/ui/Forms/Input";
import { defaultTheme } from "@app/providers/Theme/theme";
import { Form } from "@shared/ui";
import { Search } from "@shared/ui/Search";

type Values = {
    login: string;
    password: string;
};

export const loginValidationSchema = Yup.object().shape({
    login: Yup.string().required("Это обязательное поле"),
    password: Yup.string().required("Это обязательное поле"),
});

export const UIDemo = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputValuePassword, setInputValuePassword] = useState("");

    const config: FormikConfig<Values> = {
        initialValues: {
            login: "",
            password: "",
        },
        validationSchema: loginValidationSchema,
        onSubmit: () => {
            return;
        },
    };
    return (
        <Stack p={40} style={{ border: "1px solid black", borderRadius: 16, width: 500, margin: "0 auto" }}>
            <Search placeholder="Search"/>
            <Input
                onChange={(e) => setInputValuePassword(e.target.value)}
                value={inputValuePassword}
                label="Label"
                icon={<Target color={defaultTheme.colors?.gray45?.[0]} />}
                type="password"
            />
            <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} label="Label" />
            <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} label="Label" icon={<Target />} disabled />
            <Form config={config}>
                <Stack>
                    <FInput label="Login" name="login" />
                    <FInput type="password" label="Password" name="password" />
                    <Button type="submit">Submit</Button>
                </Stack>
            </Form>
        </Stack>
    );
};

export default UIDemo;
