import { User } from "../../types/user";
import { LitElement } from "lit";
import "../custom/select";
import "../custom/icon";
/**
 * Game Header component
 */
export declare class GameHeader extends LitElement {
    static readonly styles: import("lit").CSSResult[];
    user: User | null;
    /**
     * On change handler
     */
    onLevelChangeHandler(e: InputEvent): void;
    /**
     * Render level template
     * @returns {TemplateResult}
     */
    renderLevels(): import("lit-html").TemplateResult<1>;
    /**
     * Render profile template
     * @returns {TemplateResult}
     */
    renderProfile(): import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
