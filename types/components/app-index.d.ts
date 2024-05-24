import { LitElement } from 'lit';
import { ElementController } from '@open-cells/element-controller';
import '../utils/i18n';
export declare class AppIndex extends LitElement {
    elementController: ElementController;
    static readonly styles: import("lit").CSSResult[];
    onClickHandler(e: MouseEvent | TouchEvent): void;
    render(): import("lit-html").TemplateResult<1>;
}
