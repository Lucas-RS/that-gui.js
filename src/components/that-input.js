import { LitElement, html, css } from 'lit-element'
import { classMap } from 'lit-html/directives/class-map'

class ThatInput extends LitElement {
  constructor() {
    super()
    this.type = 'string'
  }

  static get properties() {
    return {
      value: {},
      label: { type: String },
      type: { type: String },
      min: { type: Number },
      max: { type: Number },
      step: { type: Number },
      helpText: { type: String },
      errorText: { type: String },
      leadingIcon: { type: String },
      trailingIcon: { type: String },
      outline: { type: Boolean },
    }
  }

  get value() {
    return this.__value
  }

  set value(value) {
    const oldValue = this.__value
    this.__value = (this.type == 'number') ? Math.ceil(parseFloat(value) / this.step) * this.step : value
    this.requestUpdate('value', oldValue)
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        font-size: 1em;
        width: 17.5em;
        height: 3.5em;
        margin: 0.125em 0.3em;
        --primary: 98, 0, 238;
        --on-surface: 0, 0, 0;
      }

      .text-field {
        position: relative;
        box-sizing: border-box;
        height: 100%;
        border-radius: 0.25em 0.25em 0 0;
        border-bottom: 0.0625em solid rgba(var(--on-surface), 0.6);
        background: rgba(var(--on-surface), 0.039);
        transition: border 0.2s, background-color 0.2s;
      }

      .text-field:hover {
        background: rgba(var(--on-surface), 0.063);
      }

      .text-field:focus-within {
        background: rgba(var(--on-surface), 0.102);
        border-bottom: 0.125em solid rgba(var(--primary), 0.6);
      }

      .text-field__input {
        position: absolute;
        top: 1.25em;
        left: 0.54em;
        width: calc(100% - 1.08em);
        height: calc(100% - 1.25em);
        font-size: inherit;
        color: rgba(var(--on-surface), 0.871);
        border: none;
        background: none;
      }

      .text-field__input:focus {
        outline: none;
      }

      .text-field__label {
        position: absolute;
        user-select: none;
        top: 50%;
        left: 0.75em;
        transform: translateY(-50%);
        color: rgba(var(--on-surface), 0.6);
        transition: top 0.2s, transform 0.2s, font-size 0.2s, color 0.2s;
      }

      .text-field__input:focus + .text-field__label {
        color: rgba(var(--primary));
      }

      .text-field__input:focus + .text-field__label,
      .text-field__label--float {
        top: 1.125em;
        transform: translateY();
        font-size: 0.75em;
        line-height: 1.25em;
      }
    `
  }

  render() {
    return html`
      <div class=${classMap({ 'text-field': true })}>
        <input
          .value=${this.value}
          @change=${event => {
            this.value = event.target.value
            this.dispatchEvent(new Event('change'))
          }}
          class=${classMap({ 'text-field__input': true })}
        />
        <label class=${classMap({ 'text-field__label': true, 'text-field__label--float': this.value != '' })}
          >${this.label}</label
        >
      </div>
      <div class=${classMap({ 'helper-text': true })}>${this.helpText}</div>
    `
  }

  firstUpdated(changedProperties) {
    if (changedProperties.has('value')) this.type = typeof this.value
    
    if (this.type == 'number') {
      this.min = 0
      this.max = this.value > 1 ? Math.pow(10, this.initialValue.toString().length) : 1
      this.step = this.value > 1 ? 1 : 0.001
    }
  }
}

customElements.define('that-input', ThatInput)
