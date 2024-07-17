import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

class CustomSpinner extends LitElement {
  static get styles() {
    return css`
      .loader {
        display: inline-block;
        position: absolute;
        margin: auto;
        width: 100%;
        min-width: 12px;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 4px solid;
        border-color: #000000 #0000;
        animation: l1 1s infinite;
      }

      @keyframes l1 {
        to {
          transform: rotate(0.5turn);
        }
      }
    `;
  }

  render() {
    return html` <div class="wrapper">
      <div class="loader"></div>
    </div>`;
  }
}

customElements.define("custom-spinner", CustomSpinner);
