import { MainInfoPanelNavigatedProps, MainInfoPanelProps } from "../ui";

export type TMainInfoPanelExtensions = {
    Main: MainInfoPanelProps;
    Navigated: MainInfoPanelNavigatedProps;
};

export type TMainInfoPanelType = MainInfoPanelNavigatedProps | MainInfoPanelProps;
