import { IFormSelectProps } from "@/components/FormSelect/interfaces";

export interface IFormSelectExtendedProps {
    label: string;
}

export type IFormSelectExtended = {} & 
    IFormSelectExtendedProps & 
    IFormSelectProps & 
    React.PropsWithChildren & 
    React.ComponentProps<'select'>;
