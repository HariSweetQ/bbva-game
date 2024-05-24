import { SelectOption } from "../../types/select";
import { LitElement, PropertyValueMap } from "lit";
import { ElementController } from '@open-cells/element-controller';
/**
 * Custom select component
 */
export declare class CustomSelect extends LitElement {
    elementController: ElementController;
    static readonly styles: import("lit").CSSResult[];
    options: SelectOption[];
    selected: string;
    emptyOption: string;
    private __show;
    private __selected;
    /**
     * Selected value option
     */
    get selectedValue(): any;
    /**
     * Dynamic CSS classes for select
     */
    get classes(): {
        "select-wrapper": boolean;
        closed: boolean;
    };
    /**
     * WC Lifecycle method
     */
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Lit lifecycle method
     */
    updated(changedProps: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    /**
     * Register events
     */
    private __registerEvents;
    /**
     * Unregister events
     */
    private __unregisterEvents;
    /**
     * Toggle show
     */
    toggleShow(e: MouseEvent | TouchEvent): void;
    /**
     * Select option
     * @param {MouseEvent|TouchEvent} e Event
     */
    selectOption(e: MouseEvent | TouchEvent): void;
    /**
     * Render
     * @returns {TemplateResult}
     */
    render(): import("lit-html").TemplateResult<1>;
}
