import { LitElement } from 'lit';
import { PageController } from '@open-cells/page-controller';
import '../../components/custom/input';
import '../../components/custom/button';
import "../../components/custom/icon";
export type FormObject = {
    [key: string]: any;
};
export declare class HomePage extends LitElement {
    static readonly styles: import("lit").CSSResult[];
    pageController: PageController;
    private __invalid;
    private __form;
    /**
     * Do login function
     */
    doLogin(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
