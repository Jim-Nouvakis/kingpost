import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

class FormValidator {
  constructor() {}

  static validateInputs;
}

class CustomForm extends LitElement {
  static styles = css`
    form {
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
  `;

  _submitForm = (e) => {
    console.log("i was called");
    e.preventDefault();
    const form = this.shadowRoot.getElementById("myForm");

    return true;
  };

  disableClosingOfSurroundingModal = new Event("disableClosingOfModal", {
    bubbles: true,
    composed: true,
  });

  constructor(props) {
    super(props);
  }

  render() {
    return html`
      <form
        method="post"
        @click="${() => {
          this.dispatchEvent(this.disableClosingOfSurroundingModal);
        }}"
        id="myForm"
        @submit="${(e) => {
          this._submitForm(e);
        }}"
      >
        <label for="name">First Name</label>
        <input type="text" id="name" required />
        <fieldset>
          <legend>Choose your monster's features:</legend>

          <div>
            <input type="checkbox" id="scales" name="scales" checked />
            <label for="scales">Scales</label>
          </div>

          <div>
            <input type="checkbox" id="horns" name="horns" />
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
        <fieldset>
          <legend>Select a maintenance drone:</legend>

          <div>
            <input type="radio" id="huey" name="drone" value="huey" checked />
            <label for="huey">Huey</label>
          </div>

          <div>
            <input type="radio" id="dewey" name="drone" value="dewey" />
            <label for="dewey">Dewey</label>
          </div>

          <div>
            <input type="radio" id="louie" name="drone" value="louie" />
            <label for="louie">Louie</label>
          </div>
        </fieldset>
      </form>
    `;
  }
}

customElements.define("custom-form", CustomForm);
