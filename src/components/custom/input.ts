import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./input.scss?inline";
import { classMap } from "lit/directives/class-map.js";
import i18next from "i18next";

/**
 * Custom input component
 */
@customElement("custom-input")
export class CustomButton extends LitElement {
  static readonly styles = [unsafeCSS(styles)];

  @property({ type: String })
  type: string = "text";

  @property({ type: String })
  name: string | null = null;

  @property({ type: String })
  placeholder: string | null = null;

  @property({ type: String })
  value: string | null = null;

  @property({ type: Boolean })
  invalid: boolean = false;

  @property({ type: [String, Array] })
  validation: string[] | string | null = null;  
  

  /**
   * Getter for input css classes 
   */
  get classes() {
    return {
      "invalid": this.invalid
    }
  }

  /**
   * Render error
   * @returns {TemplateResult}
   */
  renderError() {

    let validations:string[] = [];

    const field = i18next.t(`fields.${this.name}`);    

    if (this.validation instanceof Array) {
      validations = this.validation.map(
        (validation: string) =>
          i18next.t(`validation.${validation}`, { field })
      );

    } else if (this.validation) {
      validations.push(i18next.t(`validation.${this.validation}`, {field}));
    }
    return html`<div class="error">
      ${validations.map(validation => html`${validation}`)}
  </div>`
  }

  /**
   * On change habdler
   * @param e 
   */
  onChangeHandler(e:InputEvent) {
    const target = e.target as HTMLInputElement;    
    this.dispatchEvent(new CustomEvent("change", {
      detail: target.value
    }));
  }

  /**
   * Render
   * @returns {TemplateResult} 
   */
  render() {
    return html`<div class="input-wrapper">
    <input
      class=${classMap(this.classes)}
      type=${this.type}
      name=${this.name}
      placeholder=${this.placeholder}
      value=${this.value}
      @change=${this.onChangeHandler}
    />
    ${this.invalid ? this.renderError() : null}
  </div>`;
  }
}
