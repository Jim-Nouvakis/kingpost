import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

const resetForm = (customModal) => {
  //we target the slots inside CustomModal, and
  // we dispatch the event with name clearForm. This way the listener
  // inside CustomForm, will be triggered
  const slottedElements = customModal.shadowRoot
    .querySelector("slot")
    .assignedElements();
  slottedElements.forEach((element) =>
    element.dispatchEvent(new Event("clearForm"))
  );
};

/**
 * Custom Modal Component
 * Through slots you can pass your own title, body and action buttons
 * Thw modal has 5 listeners assigned to it, so it can be called from outside components.
 * Open Modal => event name 'openModal'
 * Close Modal if possible based on modal can close property => event name 'closeModalIfPossible'
 * Force Close Modal, which doesn't take into account the canModalClose property => event name 'forceCloseModal'
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

  _closeModalIfPossible = () => {
    if (this.canModalClose) {
      this._forceCloseModal();
    }
  };
  _forceCloseModal = () => {
    //define all the functions you want to be performed when modal closes here
    resetForm(this);
    //end of functions

    this.isModalOpen = false;
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
      <button @click="${this._openModal}">Hello</button>
    `;
  }
}

customElements.define("custom-modal", CustomModal);
