import React, { useState } from "react";
import { Button, Stack } from "@mantine/core";
import { Target } from "react-feather";
import * as Yup from "yup";
import { FormikConfig } from "formik";
import { FInput, Input } from "@shared/ui/Forms/Input";
import { FSelect, Select } from "@shared/ui/Forms/Select";
import { defaultTheme } from "@app/providers/Theme/theme";
import { BreadCrumbs, FCheckbox, Form, FProgressBar, TBreadCrumbItem, Rating, } from "@shared/ui";
import { DatePicker } from "@shared/ui/DatePicker";

const testDataSelect = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
];

type Values = {
    login: string;
    password: string;
    select: string;
    step: number;
    isConsentProcessingOfPersonalData: boolean;
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

    const handlerChangeSelect = (value: string) => {
        setSelectValue(value);
    };

    const breadCrumbsItems: TBreadCrumbItem[] = [
        { title: "Главная страница", href: { pathname: "/ui" } },
        { title: "Главная страница", href: { pathname: "/ui" } },
        { title: "Курсы", href: { pathname: "/ui" } },
    ];

    const [date, setDate] = useState<Date | null>(null);

    const config: FormikConfig<Values> = {
        initialValues: {
            login: "",
            password: "",
            select: "",
            step: 10,
            isConsentProcessingOfPersonalData: false,
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
                <Rating defaultValue={2} count={5} />
                <Rating defaultValue={1} count={1} readOnly size="small" />
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
                <DatePicker value={date} onChange={setDate} label="Date" allowLevelChange={false} />
                <Form config={config}>
                    {({ setFieldValue, values }) => (
                        <Stack>
                            <FInput label="Login" name="login" />
                            <FInput type="password" label="Password" name="password" />
                            <FSelect label="Select" name="select" data={testDataSelect} />
                            <FCheckbox
                                name="isConsentProcessingOfPersonalData"
                                label="Даю согласие на обработку персональных данных и принимаю пользовательское соглашение"
                            />
                            <FCheckbox name="isConsentProcessingOfPersonalData" />
                            <FCheckbox name="isConsentProcessingOfPersonalData" disabled />
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
