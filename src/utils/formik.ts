import { FormikErrors, FormikProps } from 'formik';
import * as React from 'react';

interface FormikInputProps<Values> {
    id: keyof Values;
    name: keyof Values;
    value?: Values[keyof Values] | string;
    isInvalid: boolean;
    helperText: string | FormikErrors<Values>[keyof Values];
    onChange?: {
        (e: React.ChangeEvent<any>): void;
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
    };
    autoComplete?: string;
}

interface Selector {
    value: number;
    label: string;
}

interface List {
    options: Selector[];
    defaultValue: Selector;
}

interface FormikSelectorProps<Values> extends FormikInputProps<any> {
    id: keyof Values;
    name: keyof Values;
    value?: object;
    options: Selector[];
    defaultValue: Selector;
}

export const formikInputProps = <Values>(
    key: keyof Values,
    formik: FormikProps<Values>,
    select?: boolean,
    date?: boolean,
): FormikInputProps<Values> => {
    const isError = formik.touched[key] && Boolean(formik.errors[key]);
    const error = formik.touched[key] && formik.errors[key] ? (formik.errors[key] as string) : ' ';
    let returnValue;
    if (select) {
        returnValue = {
            isInvalid: isError,
            helperText: error,
            id: key,
            name: key,
        };
    } else {
        returnValue = {
            isInvalid: isError,
            helperText: error,
            id: key,
            name: key,
            value: date ? (formik.values[key] as string)?.substring(0, 10) : formik.values[key] === 0 ? '0' : (formik.values[key] ?? ''),
            onChange: formik.handleChange,
            autoComplete: 'off',
        };
    }
    return returnValue;
};

export const formikInputPropsLevelDive = <Values>(key: string, formik: FormikProps<any>): FormikInputProps<Values> => {
    const firstKey = key.split('.')[0] as keyof typeof formik.values;
    const secondKey = key.split('.')[1] as string;
    const firstKeyStr = String(firstKey);
    const touchedFirst = formik.touched[firstKeyStr] as Record<string, any> | undefined;
    const errorsFirst = formik.errors[firstKeyStr] as Record<string, any> | undefined;
    const valuesFirst = formik.values[firstKeyStr] as Record<string, any> | undefined;
    const isError =
        touchedFirst?.[secondKey] &&
        errorsFirst?.[secondKey] &&
        Boolean(errorsFirst?.[secondKey]);
    const error =
        touchedFirst?.[secondKey] &&
        errorsFirst?.[secondKey]
            ? (errorsFirst[secondKey] as string)
            : ' ';
    return {
        isInvalid: isError,
        helperText: error,
        id: key as keyof Values,
        name: key as keyof Values,
        value: typeof valuesFirst === 'object' ? valuesFirst?.[secondKey] ?? '' : '',
        onChange: formik.handleChange,
        autoComplete: 'off',
    };
};

export const formikSelectorProps = <Values>(key: keyof Values, formik: FormikProps<Values>, list: List): FormikSelectorProps<Values> => {
    const isError = formik.touched[key] && Boolean(formik.errors[key]);
    const error = formik.touched[key] && formik.errors[key] ? (formik.errors[key] as string) : ' ';
    let returnValue;
    returnValue = {
        id: key,
        isInvalid: isError,
        helperText: error,
        name: key,
        onChange: (value: any) => {
            formik.setFieldValue(key.toString(), value.value);
        },
        ...list,
    };
    return returnValue;
};
