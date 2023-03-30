/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Game } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GameUpdateFormInputValues = {
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
export declare type GameUpdateFormValidationValues = {
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
export declare type GameUpdateFormOverridesProps = {
    GameUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type GameUpdateFormProps = React.PropsWithChildren<{
    overrides?: GameUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    game?: Game;
    onSubmit?: (fields: GameUpdateFormInputValues) => GameUpdateFormInputValues;
    onSuccess?: (fields: GameUpdateFormInputValues) => void;
    onError?: (fields: GameUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameUpdateFormInputValues) => GameUpdateFormInputValues;
    onValidate?: GameUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GameUpdateForm(props: GameUpdateFormProps): React.ReactElement;
