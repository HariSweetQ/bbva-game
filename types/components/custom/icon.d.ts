import { LitElement } from "lit";
/**
 * Custom icon component
 */
export declare class Customicon extends LitElement {
    static readonly styles: import("lit").CSSResult[];
    icon: string | null;
    size: string;
    invert: boolean;
    protected get _icon(): string;
    /**
     * Dynamic CSS classes for select
     */
    get classes(): {
        [x: string]: boolean;
        invert: boolean;
    };
    render(): import("lit-html").TemplateResult<1>;
}
