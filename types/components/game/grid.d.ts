import { LitElement, PropertyValueMap } from "lit";
/**
 * Game Grid component
 */
export declare class GameGrid extends LitElement {
    static readonly styles: import("lit").CSSResult[];
    valid: number;
    options: number[];
    level: string;
    private __answer;
    private __visibleOptions;
    private __secondsLeft;
    /**
     * CSS class for grid
     * @returns {Object}
     */
    get classes(): {
        grid: boolean;
        restrain: boolean;
    };
    /**
     * Lit lifecycle method
     *
     * @param {PropertyValueMap<any> | Map<PropertyKey, unknown} changedProps
     */
    updated(changedProps: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    /**
     * Reset grid
     */
    resetGrid(): void;
    /**
     * On click handler
     * @param {MouseEvent|TouchEvent} e Event
     */
    onClickHandler(e: MouseEvent | TouchEvent): void;
    /**
     * CSS class for option
     * @param option
     * @returns {Object}
     */
    optionClasses(option: number): {
        option: boolean;
        valid: boolean;
        invalid: boolean;
    };
    /**
     * Render text
     */
    renderText(): import("lit-html").TemplateResult<1>;
    /**
     * Render game grid
     * @returns {TemplateResult}
     */
    renderGrid(): import("lit-html").TemplateResult<1>;
    /**
     * Render
     * @returns {TemplateResult}
     */
    render(): import("lit-html").TemplateResult<1>;
}
