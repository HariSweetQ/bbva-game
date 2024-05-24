import { LitElement } from "lit";
/**
 * Custom button component
 */
export declare class CustomButton extends LitElement {
    static readonly styles: import("lit").CSSResult[];
    type: string;
    variant: string;
    /**
     * Dynamic CSS classes for select
     */
    get classes(): {
        [x: string]: boolean;
    };
    render(): import("lit-html").TemplateResult<1>;
}
