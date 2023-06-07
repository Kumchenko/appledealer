import { IFormInputProps } from "@/components/FormInput/interfaces";

export interface IFormInputExtendedProps {
    label: string;
}

export type IFormInputExtended = {} &
    IFormInputExtendedProps &
    IFormInputProps &
    React.PropsWithChildren &
    React.ComponentProps<'input'>;
