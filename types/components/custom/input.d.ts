import { LitElement } from "lit";
/**
 * Custom input component
 */
export declare class CustomButton extends LitElement {
    static readonly styles: import("lit").CSSResult[];
    type: string;
    name: string | null;
    placeholder: string | null;
    value: string | null;
    invalid: boolean;
    validation: string[] | string | null;
    /**
     * Getter for input css classes
     */
    get classes(): {
        invalid: boolean;
    };
    /**
     * Render error
     * @returns {TemplateResult}
     */
    renderError(): import("lit-html").TemplateResult<1>;
    /**
     * On change habdler
     * @param e
     */
    onChangeHandler(e: InputEvent): void;
    /**
     * Render
     * @returns {TemplateResult}
     */
    render(): import("lit-html").TemplateResult<1>;
}
