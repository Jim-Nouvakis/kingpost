import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";
import { resetForm, submitForm } from "./customModalUtilities.js";

/**
 * Custom Modal Component
 * Through slots you can pass your own title, body and action buttons
 * Thw modal has 5 listeners assigned to it, so it can be called from outside components.
 * Open Modal => event name 'openModal'
 * Close Modal if possible based on modal can close property => event name 'closeModalIfPossible'
 * Force Close Modal, which doesn't take into account the _canModalClose property => event name 'forceCloseModal'
 * Disable the ability of Modal to close => event name 'disableClosingOfModal'
 * Enable the ability of Modal to close => event name 'enableClosingOfModal'
 */
class CustomModal extends LitElement {
  static get properties() {
    return {
      _isModalOpen: { state: true },
      _canModalClose: { state: true },
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

    #actions {
      margin-top: 16px;
      display: flex;
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

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      min-width: 100px;
      min-height: 56px;
      padding: 4px;
      border-color: #e2e8fc;
      border-style: solid;
      border-radius: 4px;
      margin: 0 4px;
      font-weight: bold;
      background: white;
      transition: ease-in 100ms;
    }

    button:hover {
      scale: 1.1;
      transition: ease-in 100ms;
    }

    header {
      color: #2a2c3e;
      font-size: 16px;
      font-weight: bold;
    }
  `;

  _closeModalIfPossible = () => {
    if (this._canModalClose) {
      this._forceCloseModal();
    }
  };
  _forceCloseModal = () => {
    //define all the functions you want to be performed when modal closes here
    resetForm(this);
    //end of functions

    this._isModalOpen = false;
    this._canModalClose = true;
  };
  _openModal = () => {
    this._isModalOpen = true;
  };

  _disableModalCanClose = () => {
    this._canModalClose = false;
  };
  _enableModalCanClose = () => {
    this._canModalClose = true;
  };

  _onAcceptButtonPressed = () => {
    submitForm(this);
  };

  constructor() {
    super();
    this._isModalOpen = false;
    this._canModalClose = true;
    this.addEventListener("closeModal", this._closeModalIfPossible);
    this.addEventListener("forceCloseModal", this._forceCloseModal);
    this.addEventListener("openModal", this._openModal);
    this.addEventListener("disableClosingOfModal", this._disableModalCanClose);
    this.addEventListener("enableClosingOfModal", this._enableModalCanClose);
  }

  render() {
    return html`
      <div
        @click="${this._closeModalIfPossible}"
        id="backdrop"
        class="${this._isModalOpen ? "visible" : "hidden"}"
      ></div>
      <div id="modal" class="${this._isModalOpen ? "visible" : "hidden"}">
        <header>
          <slot></slot>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button id="cancel-button" @click="${this._forceCloseModal}">
            Cancel
          </button>
          <button id="accept-button" @click="${this._onAcceptButtonPressed}">
            Accept
          </button>
        </section>
      </div>
      <button @click="${this._openModal}">PRESS MEEEE</button>
    `;
  }
}

customElements.define("custom-modal", CustomModal);
