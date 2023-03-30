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
export declare type GameStatsCreateFormInputValues = {
    gameID?: string;
    userEmail?: string;
    gameName?: string;
    gameStates?: string;
    createdAt?: string;
};
export declare type GameStatsCreateFormValidationValues = {
    gameID?: ValidationFunction<string>;
    userEmail?: ValidationFunction<string>;
    gameName?: ValidationFunction<string>;
    gameStates?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GameStatsCreateFormOverridesProps = {
    GameStatsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    gameID?: PrimitiveOverrideProps<TextFieldProps>;
    userEmail?: PrimitiveOverrideProps<TextFieldProps>;
    gameName?: PrimitiveOverrideProps<TextFieldProps>;
    gameStates?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GameStatsCreateFormProps = React.PropsWithChildren<{
    overrides?: GameStatsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GameStatsCreateFormInputValues) => GameStatsCreateFormInputValues;
    onSuccess?: (fields: GameStatsCreateFormInputValues) => void;
    onError?: (fields: GameStatsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameStatsCreateFormInputValues) => GameStatsCreateFormInputValues;
    onValidate?: GameStatsCreateFormValidationValues;
} & React.CSSProperties>;
export default function GameStatsCreateForm(props: GameStatsCreateFormProps): React.ReactElement;
