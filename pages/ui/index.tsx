import React, { useState } from "react";
import { Avatar, Box, Stack, Text, ThemeIcon } from "@mantine/core";
import { Edit3, Target } from "react-feather";
import { FormikConfig } from "formik";
import { z } from "zod";
import { closeModal, openModal } from "@mantine/modals";
import { Logo } from "@components/Logo";
import {
    BreadCrumbs,
    Button,
    DisplayField,
    FCheckbox,
    FProgressBar,
    FSlider,
    FSwitch,
    Tabs,
    Input,
    RadioGroup,
    Radio,
    Select,
    FInput,
    FSelect,
    FMultiSelect,
    FRadioGroup,
    FFileButton,
    FDatePicker,
    DatePicker,
    TBreadCrumbItem,
    MultiSelect,
    Rating,
    RingProgress,
    Tooltip,
    Form,
    Search,
    FFileInput,
    FFileInputMultiple,
    UploadedFile,
} from "@shared/ui";
import { ControlPanel, FControlPanel } from "@components/Forms";
import { ChangePasswordModal } from "@features/changePassword";
import { useUploadImage, useUploadVideo } from "@entities/storage";

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
    avatarImage: UploadedFile | null;
    date: Date | null;
    logo: File | UploadedFile | null;
    doc: File[] | UploadedFile[];
    attachments: File[] | UploadedFile[];
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
    multi: z.array(z.string()).min(1, "Мин 1 элемент"),
    doc: z.array(z.any()).min(1, "Мин 1 один файл"),
});

export const UIDemo = () => {
    const [valueRingProgress, setValueRingProgress] = useState(60);
    const [inputValue, setInputValue] = useState("");
    const [inputValuePassword, setInputValuePassword] = useState("");
    const [searchValue, setSearchValue] = useState("");
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
            avatarImage: null,
            date: null,
            logo: {
                id: 115,
                name: "test2.jpeg",
                extension: "jpeg",
                size: 208642,
                absolutePath:
                    "https://api-bucket.addamant-work.ru/business-galery-public/images/Z4HsGLrX4oQL3ezwIPUyR8rmV5pdeXAgs7guTN6O.jpg",
            },
            doc: [],
            attachments: [
                {
                    id: 115,
                    name: "test2.jpeg",
                    extension: "jpeg",
                    size: 208642,
                    absolutePath:
                        "https://api-bucket.addamant-work.ru/business-galery-public/images/Z4HsGLrX4oQL3ezwIPUyR8rmV5pdeXAgs7guTN6O.jpg",
                },
            ],
        },
        validationSchema: $loginValidationSchema,
        onSubmit: () => {
            return;
        },
    };

    const handleCloseModal = () => closeModal("CHANGE_PASSWORD");

    const handleDownloadFile = (_id: number) => undefined;

    return (
        <>
            <BreadCrumbs items={breadCrumbsItems} />
            <Logo />
            <Tabs tabs={tabsList} />
            <Stack p={40} style={{ border: "1px solid black", borderRadius: 16, width: 500, margin: "0 auto", backgroundColor: "white" }}>
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
                    icon={
                        <ThemeIcon color="gray45" variant="outline" sx={{ border: "none" }}>
                            <Target />
                        </ThemeIcon>
                    }
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
                <Button variant="text" leftIcon={<Edit3 />} rightIcon={<Edit3 />}>
                    TEXT
                </Button>
                <Form config={config}>
                    {({ setFieldValue, values }) => {
                        return (
                            <Stack>
                                <Avatar src={values.avatarImage?.absolutePath || ""} />
                                <FFileButton
                                    name="avatarImage"
                                    label="Изменить аватар"
                                    buttonProps={{ leftIcon: <Edit3 /> }}
                                    useUploadFile={useUploadImage}
                                />
                                <FDatePicker name="date" success="alalala" description="rtrtrtrt" />
                                <FSlider name="price" labelAlwaysOn min={1400} max={2000} showTextInfo />
                                <FInput label="Login" name="login" description="lalalala" />
                                <FInput type="password" label="Password" name="password" success />
                                <FSelect
                                    label="Select"
                                    name="select"
                                    data={testDataSelect}
                                    description="deacription lalalala"
                                    success="sucxces"
                                />
                                <FMultiSelect data={dataMultiSelect} value={multiSelectValue} name="multi" label="Multi" success />
                                <FRadioGroup name="option" description="lalalalalalala" success="alalalala">
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
                                <FFileInput
                                    type="video"
                                    name="img"
                                    title="Загрузить картинку с ПК"
                                    // fileFormats={["jpeg", "jpg", "png"]}
                                    fileFormats={["mp4"]}
                                    withDeleteButton
                                    useUploadFile={useUploadVideo}
                                    titleButtonFileDialog="Видос"
                                />

                                {/* <FFileInput
                                    type="image"
                                    name="img"
                                    title="Загрузить картинку с ПК"
                                    fileFormats={["jpeg", "jpg", "png"]}
                                    withDeleteButton
                                    useUploadFile={useUploadImage}
                                    // fileUploadUrl="https://gallery-back.addamant-work.ru/api/storage/uploads/images"
                                    // imageMaxHeight={300}
                                    // h={500}
                                />

                                <FFileInput
                                    type="document"
                                    name="logo"
                                    title="Загрузить файл с ПК"
                                    fileFormats={["jpeg", "jpg", "png"]}
                                    useUploadFile={useUploadImage}
                                /> */}
                                <FFileInputMultiple
                                    type="document"
                                    nameForInitialFiles="attachments"
                                    nameForLoadedFiles="doc"
                                    title="Загрузить документы с ПК"
                                    fileFormats={["pdf", "jpeg", "jpg", "png"]}
                                    useUploadFile={useUploadImage}
                                    onDownloadInitialFile={handleDownloadFile}
                                />
                                <Button type="button" onClick={() => setFieldValue("step", --values.step)}>
                                    Prev
                                </Button>
                                <Button type="button" onClick={() => setFieldValue("step", ++values.step)}>
                                    Next
                                </Button>
                                <Button
                                    onClick={() =>
                                        openModal({
                                            modalId: "CHANGE_PASSWORD",
                                            title: "Изменение пароля",
                                            centered: true,
                                            size: 408,
                                            children: <ChangePasswordModal onClose={handleCloseModal} />,
                                        })
                                    }>
                                    Show Modal
                                </Button>
                            </Stack>
                        );
                    }}
                </Form>
            </Stack>
        </>
    );
};

export default UIDemo;
