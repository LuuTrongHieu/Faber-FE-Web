/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSX } from "react";

export const MODALS = [] as const;

export type TModal = (typeof MODALS)[number];

export type TModalData = {
    type?: TModal;
    title?: string;
    content?: string;
    bCloseButtonOn?: boolean;
    propsState?: unknown;
};

interface IModalInitializeObject extends TModalData {
    container?: HTMLBodyElement;
}

interface IModal extends IModalInitializeObject {
    closeHandler?: () => void;
}

class Modal implements IModal {
    protected _type?: TModal;
    protected _title?: string;
    protected _content?: string;
    protected _container?: HTMLBodyElement;
    protected _bCloseButtonOn = true;
    protected _propsState?: unknown;

    static *generateFromQueue(
        queue: Array<TModalData>,
        container: HTMLElement
    ): Generator<JSX.Element | null> {
        while (queue.length > 0) {
            const modal = new Modal({ ...queue[0] });
            yield modal.renderElement(container);
        }
    }

    constructor(initializeObject: IModalInitializeObject) {
        this._type = initializeObject.type;
        this._title = initializeObject.title;
        this._content = initializeObject.content;
        this._bCloseButtonOn = initializeObject.bCloseButtonOn ?? true;
        this._propsState = initializeObject.propsState;
    }

    public renderElement(container: HTMLElement): JSX.Element | null {
        switch (this._type) {
            default:
                return null;
        }
    }

    public get container(): HTMLBodyElement | undefined {
        return this._container;
    }

    public set container(v: HTMLBodyElement | undefined) {
        this._container = v;
    }

    public get type(): TModal | undefined {
        return this._type;
    }

    public set type(v: TModal | undefined) {
        this._type = v;
    }

    public get title(): string | undefined {
        return this._title;
    }

    public set title(v: string | undefined) {
        this._title = v;
    }

    public get content(): string | undefined {
        return this._content;
    }

    public set content(v: string | undefined) {
        this._content = v;
    }

    public get bCloseButtonOn(): boolean {
        return this._bCloseButtonOn;
    }

    public set bCloseButtonOn(v: boolean) {
        this._bCloseButtonOn = v;
    }
}

export default Modal;
