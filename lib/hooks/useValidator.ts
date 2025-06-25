"use client";
import { useEffect, useState } from "react";
import Validator, { TRule } from "../classes/Validator";

export const useValidator = (rules: TRule[]): Validator => {
    const [validator, setValidator] = useState<Validator>(new Validator([]));

    useEffect(() => {
        setValidator(new Validator(rules));
    }, [rules]);

    return validator;
};
