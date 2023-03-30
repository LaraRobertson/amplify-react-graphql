/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GameCreateFormInputValues = {
    gameName?: string;
    gameDescriptionH2?: string;
    gameDescriptionH3?: string;
    gameDescriptionP?: string;
    gameLocationPlace?: string;
    gameLocationCity?: string;
    gameType?: string;
    gameStopString?: string;
    type?: string;
    createdAt?: string;
};
export declare type GameCreateFormValidationValues = {
    gameName?: ValidationFunction<string>;
    gameDescriptionH2?: ValidationFunction<string>;
    gameDescriptionH3?: ValidationFunction<string>;
    gameDescriptionP?: ValidationFunction<string>;
    gameLocationPlace?: ValidationFunction<string>;
    gameLocationCity?: ValidationFunction<string>;
    gameType?: ValidationFunction<string>;
    gameStopString?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GameCreateFormOverridesProps = {
    GameCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    gameName?: PrimitiveOverrideProps<TextFieldProps>;
    gameDescriptionH2?: PrimitiveOverrideProps<TextFieldProps>;
    gameDescriptionH3?: PrimitiveOverrideProps<TextFieldProps>;
    gameDescriptionP?: PrimitiveOverrideProps<TextFieldProps>;
    gameLocationPlace?: PrimitiveOverrideProps<TextFieldProps>;
    gameLocationCity?: PrimitiveOverrideProps<TextFieldProps>;
    gameType?: PrimitiveOverrideProps<TextFieldProps>;
    gameStopString?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GameCreateFormProps = React.PropsWithChildren<{
    overrides?: GameCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GameCreateFormInputValues) => GameCreateFormInputValues;
    onSuccess?: (fields: GameCreateFormInputValues) => void;
    onError?: (fields: GameCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameCreateFormInputValues) => GameCreateFormInputValues;
    onValidate?: GameCreateFormValidationValues;
} & React.CSSProperties>;
export default function GameCreateForm(props: GameCreateFormProps): React.ReactElement;
