/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Game } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function GameUpdateForm(props) {
  const {
    id: idProp,
    game: gameModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    gameName: "",
    gameDescriptionH2: "",
    gameDescriptionH3: "",
    gameDescriptionP: "",
    gameLocationPlace: "",
    gameLocationCity: "",
    gameType: "",
    gameStopString: "",
    type: "",
    createdAt: "",
  };
  const [gameName, setGameName] = React.useState(initialValues.gameName);
  const [gameDescriptionH2, setGameDescriptionH2] = React.useState(
    initialValues.gameDescriptionH2
  );
  const [gameDescriptionH3, setGameDescriptionH3] = React.useState(
    initialValues.gameDescriptionH3
  );
  const [gameDescriptionP, setGameDescriptionP] = React.useState(
    initialValues.gameDescriptionP
  );
  const [gameLocationPlace, setGameLocationPlace] = React.useState(
    initialValues.gameLocationPlace
  );
  const [gameLocationCity, setGameLocationCity] = React.useState(
    initialValues.gameLocationCity
  );
  const [gameType, setGameType] = React.useState(initialValues.gameType);
  const [gameStopString, setGameStopString] = React.useState(
    initialValues.gameStopString
  );
  const [type, setType] = React.useState(initialValues.type);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = gameRecord
      ? { ...initialValues, ...gameRecord }
      : initialValues;
    setGameName(cleanValues.gameName);
    setGameDescriptionH2(cleanValues.gameDescriptionH2);
    setGameDescriptionH3(cleanValues.gameDescriptionH3);
    setGameDescriptionP(cleanValues.gameDescriptionP);
    setGameLocationPlace(cleanValues.gameLocationPlace);
    setGameLocationCity(cleanValues.gameLocationCity);
    setGameType(cleanValues.gameType);
    setGameStopString(cleanValues.gameStopString);
    setType(cleanValues.type);
    setCreatedAt(cleanValues.createdAt);
    setErrors({});
  };
  const [gameRecord, setGameRecord] = React.useState(gameModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Game, idProp)
        : gameModelProp;
      setGameRecord(record);
    };
    queryData();
  }, [idProp, gameModelProp]);
  React.useEffect(resetStateValues, [gameRecord]);
  const validations = {
    gameName: [{ type: "Required" }],
    gameDescriptionH2: [],
    gameDescriptionH3: [],
    gameDescriptionP: [],
    gameLocationPlace: [],
    gameLocationCity: [],
    gameType: [],
    gameStopString: [],
    type: [{ type: "Required" }],
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
          gameName,
          gameDescriptionH2,
          gameDescriptionH3,
          gameDescriptionP,
          gameLocationPlace,
          gameLocationCity,
          gameType,
          gameStopString,
          type,
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
          await DataStore.save(
            Game.copyOf(gameRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "GameUpdateForm")}
      {...rest}
    >
      <TextField
        label="Game name"
        isRequired={true}
        isReadOnly={false}
        value={gameName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameName: value,
              gameDescriptionH2,
              gameDescriptionH3,
              gameDescriptionP,
              gameLocationPlace,
              gameLocationCity,
              gameType,
              gameStopString,
              type,
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
        label="Game description h2"
        isRequired={false}
        isReadOnly={false}
        value={gameDescriptionH2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameName,
              gameDescriptionH2: value,
              gameDescriptionH3,
              gameDescriptionP,
              gameLocationPlace,
              gameLocationCity,
              gameType,
              gameStopString,
              type,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.gameDescriptionH2 ?? value;
          }
          if (errors.gameDescriptionH2?.hasError) {
            runValidationTasks("gameDescriptionH2", value);
          }
          setGameDescriptionH2(value);
        }}
        onBlur={() =>
          runValidationTasks("gameDescriptionH2", gameDescriptionH2)
        }
        errorMessage={errors.gameDescriptionH2?.errorMessage}
        hasError={errors.gameDescriptionH2?.hasError}
        {...getOverrideProps(overrides, "gameDescriptionH2")}
      ></TextField>
      <TextField
        label="Game description h3"
        isRequired={false}
        isReadOnly={false}
        value={gameDescriptionH3}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameName,
              gameDescriptionH2,
              gameDescriptionH3: value,
              gameDescriptionP,
              gameLocationPlace,
              gameLocationCity,
              gameType,
              gameStopString,
              type,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.gameDescriptionH3 ?? value;
          }
          if (errors.gameDescriptionH3?.hasError) {
            runValidationTasks("gameDescriptionH3", value);
          }
          setGameDescriptionH3(value);
        }}
        onBlur={() =>
          runValidationTasks("gameDescriptionH3", gameDescriptionH3)
        }
        errorMessage={errors.gameDescriptionH3?.errorMessage}
        hasError={errors.gameDescriptionH3?.hasError}
        {...getOverrideProps(overrides, "gameDescriptionH3")}
      ></TextField>
      <TextField
        label="Game description p"
        isRequired={false}
        isReadOnly={false}
        value={gameDescriptionP}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameName,
              gameDescriptionH2,
              gameDescriptionH3,
              gameDescriptionP: value,
              gameLocationPlace,
              gameLocationCity,
              gameType,
              gameStopString,
              type,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.gameDescriptionP ?? value;
          }
          if (errors.gameDescriptionP?.hasError) {
            runValidationTasks("gameDescriptionP", value);
          }
          setGameDescriptionP(value);
        }}
        onBlur={() => runValidationTasks("gameDescriptionP", gameDescriptionP)}
        errorMessage={errors.gameDescriptionP?.errorMessage}
        hasError={errors.gameDescriptionP?.hasError}
        {...getOverrideProps(overrides, "gameDescriptionP")}
      ></TextField>
      <TextField
        label="Game location place"
        isRequired={false}
        isReadOnly={false}
        value={gameLocationPlace}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameName,
              gameDescriptionH2,
              gameDescriptionH3,
              gameDescriptionP,
              gameLocationPlace: value,
              gameLocationCity,
              gameType,
              gameStopString,
              type,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.gameLocationPlace ?? value;
          }
          if (errors.gameLocationPlace?.hasError) {
            runValidationTasks("gameLocationPlace", value);
          }
          setGameLocationPlace(value);
        }}
        onBlur={() =>
          runValidationTasks("gameLocationPlace", gameLocationPlace)
        }
        errorMessage={errors.gameLocationPlace?.errorMessage}
        hasError={errors.gameLocationPlace?.hasError}
        {...getOverrideProps(overrides, "gameLocationPlace")}
      ></TextField>
      <TextField
        label="Game location city"
        isRequired={false}
        isReadOnly={false}
        value={gameLocationCity}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameName,
              gameDescriptionH2,
              gameDescriptionH3,
              gameDescriptionP,
              gameLocationPlace,
              gameLocationCity: value,
              gameType,
              gameStopString,
              type,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.gameLocationCity ?? value;
          }
          if (errors.gameLocationCity?.hasError) {
            runValidationTasks("gameLocationCity", value);
          }
          setGameLocationCity(value);
        }}
        onBlur={() => runValidationTasks("gameLocationCity", gameLocationCity)}
        errorMessage={errors.gameLocationCity?.errorMessage}
        hasError={errors.gameLocationCity?.hasError}
        {...getOverrideProps(overrides, "gameLocationCity")}
      ></TextField>
      <TextField
        label="Game type"
        isRequired={false}
        isReadOnly={false}
        value={gameType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameName,
              gameDescriptionH2,
              gameDescriptionH3,
              gameDescriptionP,
              gameLocationPlace,
              gameLocationCity,
              gameType: value,
              gameStopString,
              type,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.gameType ?? value;
          }
          if (errors.gameType?.hasError) {
            runValidationTasks("gameType", value);
          }
          setGameType(value);
        }}
        onBlur={() => runValidationTasks("gameType", gameType)}
        errorMessage={errors.gameType?.errorMessage}
        hasError={errors.gameType?.hasError}
        {...getOverrideProps(overrides, "gameType")}
      ></TextField>
      <TextField
        label="Game stop string"
        isRequired={false}
        isReadOnly={false}
        value={gameStopString}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameName,
              gameDescriptionH2,
              gameDescriptionH3,
              gameDescriptionP,
              gameLocationPlace,
              gameLocationCity,
              gameType,
              gameStopString: value,
              type,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.gameStopString ?? value;
          }
          if (errors.gameStopString?.hasError) {
            runValidationTasks("gameStopString", value);
          }
          setGameStopString(value);
        }}
        onBlur={() => runValidationTasks("gameStopString", gameStopString)}
        errorMessage={errors.gameStopString?.errorMessage}
        hasError={errors.gameStopString?.hasError}
        {...getOverrideProps(overrides, "gameStopString")}
      ></TextField>
      <TextField
        label="Type"
        isRequired={true}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gameName,
              gameDescriptionH2,
              gameDescriptionH3,
              gameDescriptionP,
              gameLocationPlace,
              gameLocationCity,
              gameType,
              gameStopString,
              type: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
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
              gameName,
              gameDescriptionH2,
              gameDescriptionH3,
              gameDescriptionP,
              gameLocationPlace,
              gameLocationCity,
              gameType,
              gameStopString,
              type,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || gameModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || gameModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
