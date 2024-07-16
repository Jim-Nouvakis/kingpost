import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

/**
 * Custom Modal Component
 * Through slots you can pass your own title, body and action buttons
 * Thw modal has 4 listeners assigned to it, so it can be called from outside components.
 * Open Modal => event name 'openModal'
 * Close Modal => event name 'closeModal'
 * Disable the ability of Modal to close => event name 'disableClosingOfModal'
 * Enable the ability of Modal to close => event name 'enableClosingOfModal'
 */
class CustomModal extends LitElement {
  static get properties() {
    return {
      isModalOpen: { state: true },
      canModalClose: { state: true },
    };
  }

  static styles = css`
    #backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.18);
      z-index: 9;
    }

    #modal {
      position: fixed;
      top: 15vh;
      left: 25%;
      width: 50%;
      z-index: 100;
      background: white;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 8px;
    }

    .visible {
      transition: all 500ms;
      opacity: 1;
      pointer-events: all;
    }

    .hidden {
      pointer-events: none;
      transition: all 500ms;

      opacity: 0;
    }
  `;

  _closeModal = () => {
    if (this.canModalClose) {
      this.isModalOpen = false;
    }
  };
  _openModal = () => {
    this.isModalOpen = true;
  };

  _disableModalCanClose = () => {
    this.canModalClose = false;
  };
  _enableModalCanClose = () => {
    this.canModalClose = true;
  };

  constructor() {
    super();
    this.isModalOpen = false;
    this.canModalClose = true;
    this.addEventListener("closeModal", this._closeModal);
    this.addEventListener("openModal", this._openModal);
    this.addEventListener("disableClosingOfModal", this._disableModalCanClose);
    this.addEventListener("enableClosingOfModal", this._enableModalCanClose);
  }

  render() {
    return html` <div
        @click="${() => {
          this._closeModal();
        }}"
        id="backdrop"
        class="${this.isModalOpen ? "visible" : "hidden"}"
      ></div>
      <div id="modal" class="${this.isModalOpen ? "visible" : "hidden"}">
        <header>
          <slot></slot>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <slot></slot>
        </section>
      </div>
      <button
        @click="${() =>
          this.isModalOpen ? this._closeModal() : this._openModal()}"
      >
        Hello
      </button>
      ${this.isModalOpen ? html`<p>hi</p>` : html`<p>close</p>`}`;
  }
}

customElements.define("custom-modal", CustomModal);
