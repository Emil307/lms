import React, { useState } from "react";
import { Box, Stack, Text, useMantineTheme } from "@mantine/core";
import { Target } from "react-feather";
import { FormikConfig } from "formik";
import { z } from "zod";
import { Logo } from "@components/Logo";
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
    FSwitch,
    Tabs,
    MultiSelect,
    Input,
    RadioGroup,
    Radio,
    Search,
    Select,
    DatePicker,
    FInput,
    FSelect,
    FMultiSelect,
    FRadioGroup,
} from "@shared/ui";
import { ControlPanel, FControlPanel } from "@components/Forms";

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
    multi: string[];
    isConsentProcessingOfPersonalData: boolean;
    price: number;
    hasOwner: boolean;
    hasPassword: boolean;
};

const radioGroupValues = [
    { id: "1", label: "1000", value: "1" },
    { id: "2", label: "2000", value: "2" },
    { id: "3", label: "3000", value: "3", disabled: true },
    { id: "4", label: "4000", value: "4", disabled: true },
];

export const $loginValidationSchema = z.object({
    login: z.string({ required_error: "Это обязательное поле" }),
    password: z.string({ required_error: "Это обязательное поле" }),
    option: z.string({ required_error: "Выберите что-то" }),
    select: z.string({ required_error: "Нужно что-то выбрать" }),
});

export const UIDemo = () => {
    const [valueRingProgress, setValueRingProgress] = useState(60);
    const [inputValue, setInputValue] = useState("");
    const [inputValuePassword, setInputValuePassword] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [multiSelectValue, setMultiSelectValue] = useState<string[] | never[]>([]);

    const theme = useMantineTheme();

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

    const [date, setDate] = useState<Date | null>(null);

    const config: FormikConfig<Values> = {
        initialValues: {
            login: "",
            password: "",
            option: "",
            select: "",
            step: 10,
            multi: [],
            isConsentProcessingOfPersonalData: false,
            price: 1500,
            hasOwner: true,
            hasPassword: false,
        },
        validationSchema: $loginValidationSchema,
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
                <ControlPanel variant="primary" label="Уведомлять о проверенных домашних заданиях" />
                <MultiSelect data={dataMultiSelect} value={multiSelectValue} onChange={handlerSelectValue} label="multi" />
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
                    icon={<Target color={theme.colors.gray45[0]} />}
                    type="password"
                />
                <RadioGroup>
                    {radioGroupValues.map((item) => {
                        return <Radio key={item.id} label={item.label} value={item.value} />;
                    })}
                </RadioGroup>
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
                            <FInput label="Login" name="login" description="lalalala" />
                            <FInput type="password" label="Password" name="password" success={true} />
                            <FSelect label="Select" name="select" data={testDataSelect} />
                            <FMultiSelect data={dataMultiSelect} value={multiSelectValue} name="multi" label="Multi" />
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
                            <FControlPanel
                                name="isConsentProcessingOfPersonalData"
                                label="Уведомлять о проверенных домашних заданиях"
                                variant="primary"
                            />
                            <Tooltip label="Оптимизация управления финансами в реалиях современного бизнеса и мировой повести по ядерному вооружению крупных мировых держав мировой повести по ядерному вооружению крупных мировых держав ">
                                <Button type="submit">Submit</Button>
                            </Tooltip>
                            <FSwitch name="hasOwner" label="llalal" labelPosition="left" variant="primary" />
                            <FSwitch name="hasPassword" variant="secondary" />
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
