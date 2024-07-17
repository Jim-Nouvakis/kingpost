import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

import {
  closeParentModal,
  disableClosingOfSurroundingModal,
  parseValues,
  sendEventWithDataToParentComponent,
  validateForm,
} from "./customFormUtilities.js";

import { sleepImitator } from "../utilities.js";

class CustomForm extends LitElement {
  static styles = css`
    form {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }

    input {
      margin-top: 8px;
    }

    fieldset {
      margin-top: 8px;
    }
  `;

  static get properties() {
    return {
      _isLoading: { state: true },
    };
  }

  _validateFormAndGetValuesOfFormAndSendData = () => {
    //we take all the values from the form. Then we perform some
    //operations inside try, catch blocks to make sure that even
    //if something accidental is turned into undefined or
    // null the code doesn't break
    const fname = this.shadowRoot.getElementById("fname").value;
    let monsterFeatures = this.shadowRoot.querySelectorAll(".monster-feature");
    const car = this.shadowRoot.getElementById("cars").value;
    let maintenanceDrones =
      this.shadowRoot.querySelectorAll(".maintenance-drone");

    try {
      monsterFeatures = Array.from(monsterFeatures);
    } catch (e) {
      console.error("CustomForm@line85");
      monsterFeatures = [];
    }

    try {
      maintenanceDrones = Array.from(maintenanceDrones);
    } catch (e) {
      console.error("CustomForm@line92");
      maintenanceDrones = [];
    }

    const values = {
      fname,
      monsterFeatures,
      car,
      maintenanceDrones,
    };

    try {
      if (validateForm(values)) {
        const parsedValues = parseValues(values);
        sendEventWithDataToParentComponent(parsedValues, this);
      }
    } catch (e) {
      console.error("CustomForm@line52");
    }
  };

  _triggerSubmitOfForm = () => {
    this.shadowRoot.getElementById("myForm").requestSubmit();
  };

  _submitForm = async (e) => {
    this._isLoading = true;
    e.preventDefault();
    await sleepImitator();
    this._validateFormAndGetValuesOfFormAndSendData();
    this._isLoading = false;
    closeParentModal(this);
    return true;
  };

  _clearForm = () => {
    const form = this.shadowRoot.getElementById("myForm");
    form.reset();
  };

  constructor(props) {
    super(props);
    this.addEventListener("submitForm", this._triggerSubmitOfForm);
    this.addEventListener("clearForm", this._clearForm);
    this._isLoading = false;
  }

  render() {
    return html`
      ${this._isLoading ? html` <custom-spinner></custom-spinner>` : html``}
      <form
        @click="${() => {
          this.dispatchEvent(disableClosingOfSurroundingModal);
        }}"
        @submit="${this._submitForm}"
        id="myForm"
      >
        <label for="name">First Name</label>
        <input type="text" id="fname" required />
        <fieldset>
          <legend>Choose your monster's features:</legend>

          <div>
            <input
              type="checkbox"
              class="monster-feature"
              id="scales"
              name="scales"
              checked
            />
            <label for="scales">Scales</label>
          </div>

          <div>
            <input
              type="checkbox"
              class="monster-feature"
              id="horns"
              name="horns"
            />
            <label for="horns">Horns</label>
          </div>
        </fieldset>

        <label for="cars">Choose a car:</label>
        <select name="cars" id="cars" form="carform">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
        <fieldset id="maintenance-drones">
          <legend>Select a maintenance drone:</legend>
          <div>
            <input
              class="maintenance-drone"
              type="radio"
              id="huey"
              name="drone"
              value="huey"
              checked
            />
            <label for="huey">Huey</label>
          </div>

          <div>
            <input
              class="maintenance-drone"
              type="radio"
              id="dewey"
              name="drone"
              value="dewey"
            />
            <label for="dewey">Dewey</label>
          </div>

          <div>
            <input
              type="radio"
              class="maintenance-drone"
              id="louie"
              name="drone"
              value="louie"
            />
            <label for="louie">Louie</label>
          </div>
        </fieldset>
      </form>
    `;
  }
}

customElements.define("custom-form", CustomForm);
