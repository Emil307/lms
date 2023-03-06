import React, { useState } from "react";
import { Button, Stack } from "@mantine/core";
import { Target } from "react-feather";
import * as Yup from "yup";
import { FormikConfig } from "formik";
import { FInput, Input } from "@shared/ui/Forms/Input";
import { FSelect, Select } from "@shared/ui/Forms/Select";
import { defaultTheme } from "@app/providers/Theme/theme";
import { BreadCrumbs, Form, FProgressBar, TBreadCrumbItem } from "@shared/ui";
import { MultiSelect } from "@shared/ui/Forms/MultiSelect";

const testDataSelect = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
];

const dataMultiSelect = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
    { value: "riot", label: "Riot" },
    { value: "next", label: "Next.js" },
    { value: "blitz", label: "Blitz.js" },
    { value: "react2", label: "React2" },
    { value: "ng2", label: "Angular2" },
    { value: "svelte2", label: "Svelte2" },
    { value: "vue2", label: "Vue2" },
    { value: "riot2", label: "Riot2" },
    { value: "next2", label: "Next.js2" },
    { value: "blitz2", label: "Blitz.js2" },
];

type Values = {
    login: string;
    password: string;
    select: string;
    step: number;
};

export const loginValidationSchema = Yup.object().shape({
    login: Yup.string().required("Это обязательное поле"),
    password: Yup.string().required("Это обязательное поле"),
    select: Yup.string().required("Нужно что-то выбрать"),
});

export const UIDemo = () => {
    const [inputValue, setInputValue] = useState("");
    const [inputValuePassword, setInputValuePassword] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [multiSelectValue, setMultiSelectValue] = useState<string[] | never[]>([]);

    const handlerSelectValue = (value: string[]) => {
        setMultiSelectValue(value);
    };

    const handlerChangeSelect = (value: string) => {
        setSelectValue(value);
    };

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/ui" } },
        { title: "Главная страница", href: { pathname: "/ui" } },
        { title: "Курсы", href: { pathname: "/ui" } },
    ];

    const config: FormikConfig<Values> = {
        initialValues: {
            login: "",
            password: "",
            select: "",
            step: 10,
        },
        validationSchema: loginValidationSchema,
        onSubmit: () => {
            return;
        },
    };
    return (
        <>
            <BreadCrumbs items={breadCrumbsItems} />
            <Stack p={40} style={{ border: "1px solid black", borderRadius: 16, width: 500, margin: "0 auto" }}>
                <MultiSelect data={dataMultiSelect} value={multiSelectValue} onChange={handlerSelectValue} label="multi" />
                <Input
                    onChange={(e) => setInputValuePassword(e.target.value)}
                    value={inputValuePassword}
                    label="Label"
                    icon={<Target color={defaultTheme.colors?.gray45?.[0]} />}
                    type="password"
                />
                <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} label="Label" />
                <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} label="Label" icon={<Target />} disabled />
                <Select data={testDataSelect} clearable label="Select" value={selectValue} onChange={handlerChangeSelect} />
                <Select data={testDataSelect} searchable label="Select" value={selectValue} onChange={handlerChangeSelect} />
                <Form config={config}>
                    {({ setFieldValue, values }) => (
                        <Stack>
                            <FInput label="Login" name="login" />
                            <FInput type="password" label="Password" name="password" />
                            <FSelect label="Select" name="select" data={testDataSelect} />
                            <Button type="submit">Submit</Button>
                            <FProgressBar name="step" label="вопросов" maxValue={16} />
                            <Button type="button" onClick={() => setFieldValue("step", --values.step)}>
                                Prev
                            </Button>
                            <Button type="button" onClick={() => setFieldValue("step", ++values.step)}>
                                Next
                            </Button>
                        </Stack>
                    )}
                </Form>
            </Stack>
        </>
    );
};

export default UIDemo;
