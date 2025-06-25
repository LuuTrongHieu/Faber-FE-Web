import methods from "validator";
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
methods.isEmpty;
export type TRule = {
    field: string;
    type?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    method: (...args: any[]) => boolean;
    when: boolean;
    args?: [string];
    message: string;
};

export type TObject = {
    [key: string]: string;
};

class Validator {
    protected _rules: TRule[];
    protected _errors: TObject;
    protected _bValid: boolean;

    constructor(rules: TRule[]) {
        this._rules = rules;
        this._bValid = true;
        this._errors = {};
    }

    validate(values: TObject): TObject {
        this._errors = {};
        this._bValid = true;
        this._rules.forEach((rule) => {
            if (this._errors[rule.field]) return;

            const fieldValue = values[rule.field] || "";
            const args = rule.args || [];
            const validationMethod = rule.method;

            if (validationMethod(fieldValue, ...args, values) !== rule.when) {
                this._errors[rule.type || rule.field] = rule.message;
                this._bValid = false;
            }
        });
        return this._errors;
    }

    public get valid(): boolean {
        return this._bValid;
    }

    public get errors(): TObject {
        return this._errors;
    }
}

export default Validator;
