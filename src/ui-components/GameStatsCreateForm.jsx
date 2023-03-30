/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { GameStats } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function GameStatsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    gameID: "",
    userEmail: "",
    gameName: "",
    gameStates: "",
    createdAt: "",
  };
  const [gameID, setGameID] = React.useState(initialValues.gameID);
  const [userEmail, setUserEmail] = React.useState(initialValues.userEmail);
  const [gameName, setGameName] = React.useState(initialValues.gameName);
  const [gameStates, setGameStates] = React.useState(initialValues.gameStates);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setGameID(initialValues.gameID);
    setUserEmail(initialValues.userEmail);
    setGameName(initialValues.gameName);
    setGameStates(initialValues.gameStates);
    setCreatedAt(initialValues.createdAt);
    setErrors({});
  };
  const validations = {
    gameID: [{ type: "Required" }],
    userEmail: [{ type: "Required" }],
    gameName: [],
    gameStates: [],
    createdAt: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          gameID,
          userEmail,
          gameName,
          gameStates,
          createdAt,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new GameStats(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "GameStatsCreateForm")}
      {...rest}
    >
      <TextField
        label="Game id"
        isRequired={true}
        isReadOnly={false}
        value={gameID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameID: value,
              userEmail,
              gameName,
              gameStates,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.gameID ?? value;
          }
          if (errors.gameID?.hasError) {
            runValidationTasks("gameID", value);
          }
          setGameID(value);
        }}
        onBlur={() => runValidationTasks("gameID", gameID)}
        errorMessage={errors.gameID?.errorMessage}
        hasError={errors.gameID?.hasError}
        {...getOverrideProps(overrides, "gameID")}
      ></TextField>
      <TextField
        label="User email"
        isRequired={true}
        isReadOnly={false}
        value={userEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameID,
              userEmail: value,
              gameName,
              gameStates,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.userEmail ?? value;
          }
          if (errors.userEmail?.hasError) {
            runValidationTasks("userEmail", value);
          }
          setUserEmail(value);
        }}
        onBlur={() => runValidationTasks("userEmail", userEmail)}
        errorMessage={errors.userEmail?.errorMessage}
        hasError={errors.userEmail?.hasError}
        {...getOverrideProps(overrides, "userEmail")}
      ></TextField>
      <TextField
        label="Game name"
        isRequired={false}
        isReadOnly={false}
        value={gameName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameID,
              userEmail,
              gameName: value,
              gameStates,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.gameName ?? value;
          }
          if (errors.gameName?.hasError) {
            runValidationTasks("gameName", value);
          }
          setGameName(value);
        }}
        onBlur={() => runValidationTasks("gameName", gameName)}
        errorMessage={errors.gameName?.errorMessage}
        hasError={errors.gameName?.hasError}
        {...getOverrideProps(overrides, "gameName")}
      ></TextField>
      <TextField
        label="Game states"
        isRequired={false}
        isReadOnly={false}
        value={gameStates}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameID,
              userEmail,
              gameName,
              gameStates: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.gameStates ?? value;
          }
          if (errors.gameStates?.hasError) {
            runValidationTasks("gameStates", value);
          }
          setGameStates(value);
        }}
        onBlur={() => runValidationTasks("gameStates", gameStates)}
        errorMessage={errors.gameStates?.errorMessage}
        hasError={errors.gameStates?.hasError}
        {...getOverrideProps(overrides, "gameStates")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        value={createdAt}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameID,
              userEmail,
              gameName,
              gameStates,
              createdAt: value,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
