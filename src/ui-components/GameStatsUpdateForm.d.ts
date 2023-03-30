/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GameStats } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GameStatsUpdateFormInputValues = {
    gameID?: string;
    userEmail?: string;
    gameName?: string;
    gameStates?: string;
    createdAt?: string;
};
export declare type GameStatsUpdateFormValidationValues = {
    gameID?: ValidationFunction<string>;
    userEmail?: ValidationFunction<string>;
    gameName?: ValidationFunction<string>;
    gameStates?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GameStatsUpdateFormOverridesProps = {
    GameStatsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    gameID?: PrimitiveOverrideProps<TextFieldProps>;
    userEmail?: PrimitiveOverrideProps<TextFieldProps>;
    gameName?: PrimitiveOverrideProps<TextFieldProps>;
    gameStates?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GameStatsUpdateFormProps = React.PropsWithChildren<{
    overrides?: GameStatsUpdateFormOverridesProps | undefined | null;
} & {
    gameID?: string;
    gameStats?: GameStats;
    onSubmit?: (fields: GameStatsUpdateFormInputValues) => GameStatsUpdateFormInputValues;
    onSuccess?: (fields: GameStatsUpdateFormInputValues) => void;
    onError?: (fields: GameStatsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GameStatsUpdateFormInputValues) => GameStatsUpdateFormInputValues;
    onValidate?: GameStatsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GameStatsUpdateForm(props: GameStatsUpdateFormProps): React.ReactElement;
