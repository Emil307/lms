import React, { useState } from "react";
import { Box, Flex, Stack, Text } from "@mantine/core";
import { Target } from "react-feather";
import * as Yup from "yup";
import { FormikConfig } from "formik";
import { Logo } from "@components";
import { FInput, Input } from "@shared/ui/Forms/Input";
import { FSelect, Select } from "@shared/ui/Forms/Select";
import { defaultTheme } from "@app/providers/Theme/theme";
import { Tabs } from "@shared/ui/Tabs";
import { Search } from "@shared/ui/Search";
import { FRadioGroup, RadioGroup } from "@shared/ui/Forms/RadioGroup";
import { Radio } from "@shared/ui/Forms/RadioGroup/Radio";
import {
    BreadCrumbs,
    FCheckbox,
    Form,
    FProgressBar,
    TBreadCrumbItem,
    Rating,
    Button,
    RingProgress,
    FSlider,
    Tooltip,
    DisplayField,
} from "@shared/ui";
import { DatePicker } from "@shared/ui/DatePicker";

const testDataSelect = [
    { value: "react", label: "React" },
    { value: "ng", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "vue", label: "Vue" },
];

const tabsList = [
    { id: 1, label: "First", value: "1" },
    { id: 2, label: "Second", value: "2" },
    { id: 3, label: "Third", value: "3", withIndicator: true },
];

type Values = {
    login: string;
    password: string;
    option: string;
    select: string;
    step: number;
    isConsentProcessingOfPersonalData: boolean;
    price: number;
};

const radioGroupValues = [
    { id: "1", label: "1000", value: "1" },
    { id: "2", label: "2000", value: "2" },
    { id: "3", label: "3000", value: "3", disabled: true },
    { id: "4", label: "4000", value: "4", disabled: true },
];

export const loginValidationSchema = Yup.object().shape({
    login: Yup.string().required("Это обязательное поле"),
    password: Yup.string().required("Это обязательное поле"),
    option: Yup.string().required("Выберите что-то"),
    select: Yup.string().required("Нужно что-то выбрать"),
});

export const UIDemo = () => {
    const [valueRingProgress, setValueRingProgress] = useState(60);
    const [inputValue, setInputValue] = useState("");
    const [inputValuePassword, setInputValuePassword] = useState("");
    const [searchValue, setSearchValue] = useState("");
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
            option: "",
            select: "",
            step: 10,
            isConsentProcessingOfPersonalData: false,
            price: 1500,
        },
        validationSchema: loginValidationSchema,
        onSubmit: () => {
            return;
        },
    };

    return (
        <>
            <BreadCrumbs items={breadCrumbsItems} />
            <Logo />
            <Tabs tabs={tabsList} />
            <Stack p={40} style={{ border: "1px solid black", borderRadius: 16, width: 500, margin: "0 auto" }}>
                <Rating defaultValue={2} count={5} />
                <Rating defaultValue={1} count={1} readOnly size="small" />
                <DisplayField label="Фамилия" value="Алексеева" variant="compact" />
                <DisplayField label="Имя" value="Екатерина" render={(middlename) => <Text sx={{ color: "red" }}>{middlename}</Text>} />
                <DisplayField label="Отчество" />
                <Box display="flex">
                    <RingProgress value={valueRingProgress} label="text" />
                    <RingProgress value={valueRingProgress} size="small" />
                </Box>
                <Button type="button" onClick={() => setValueRingProgress((prev) => prev - 10)}>
                    -
                </Button>
                <Button type="button" onClick={() => setValueRingProgress((prev) => prev + 10)}>
                    +
                </Button>
                <Input
                    onChange={(e) => setInputValuePassword(e.target.value)}
                    value={inputValuePassword}
                    label="Label"
                    icon={<Target color={defaultTheme.colors?.gray45?.[0]} />}
                    type="password"
                />
                <RadioGroup>
                    {radioGroupValues.map((item) => {
                        return <Radio key={item.id} label={item.label} value={item.value} />;
                    })}
                </RadioGroup>
                <Flex gap={16}>
                    <Button variant="primary" size="large" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="primary" size="large" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="primary" size="medium" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="primary" size="medium" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="primary" size="small" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="primary" size="small" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>

                <Flex gap={16}>
                    <Button variant="secondary" size="large" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="secondary" size="large" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="secondary" size="medium" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="secondary" size="medium" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="secondary" size="small" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="secondary" size="small" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="border" size="large" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="border" size="large" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="border" size="medium" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="border" size="medium" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="border" size="small" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="border" size="small" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>

                <Flex gap={16}>
                    <Button variant="white" size="large" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="white" size="large" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="white" size="medium" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="white" size="medium" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="white" size="small" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="white" size="small" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>

                <Flex gap={16}>
                    <Button variant="text" size="large" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="text" size="large" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="text" size="medium" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="text" size="medium" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Flex gap={16}>
                    <Button variant="text" size="small" leftIcon={<Target />} rightIcon={<Target />}>
                        Button
                    </Button>
                    <Button variant="text" size="small" leftIcon={<Target />} rightIcon={<Target />} disabled>
                        Button
                    </Button>
                </Flex>
                <Search styleVariant="course" placeholder="Search" value={searchValue} setValue={setSearchValue} />
                <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} label="Label" />
                <Input onChange={(e) => setInputValue(e.target.value)} value={inputValue} label="Label" icon={<Target />} disabled />
                <Select data={testDataSelect} clearable label="Select" value={selectValue} onChange={handlerChangeSelect} />
                <Select data={testDataSelect} searchable label="Select" value={selectValue} onChange={handlerChangeSelect} />
                <DatePicker value={date} onChange={setDate} label="Date" allowLevelChange={false} />
                <Form config={config}>
                    {({ setFieldValue, values }) => (
                        <Stack>
                            <FSlider name="price" labelAlwaysOn min={1400} max={2000} showTextInfo />
                            <FInput label="Login" name="login" />
                            <FInput type="password" label="Password" name="password" />
                            <FSelect label="Select" name="select" data={testDataSelect} />

                            <FRadioGroup name="option">
                                {radioGroupValues.map((item) => {
                                    return <Radio key={item.id} label={item.label} value={item.value} />;
                                })}
                            </FRadioGroup>
                            <FCheckbox
                                name="isConsentProcessingOfPersonalData"
                                label="Даю согласие на обработку персональных данных и принимаю пользовательское соглашение"
                            />
                            <FCheckbox name="isConsentProcessingOfPersonalData" />
                            <FCheckbox name="isConsentProcessingOfPersonalData" disabled />
                            <Tooltip label="Оптимизация управления финансами в реалиях современного бизнеса и мировой повести по ядерному вооружению крупных мировых держав мировой повести по ядерному вооружению крупных мировых держав ">
                                <Button type="submit">Submit</Button>
                            </Tooltip>
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
