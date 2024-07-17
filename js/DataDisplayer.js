import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

class DataDisplayer extends LitElement {
  static get properties() {
    return {
      _fname: { state: true },
      _monsterFeatures: { state: true },
      _car: { state: true },
      _maintenanceDrones: { state: true },
    };
  }

  static styles = css`
    table {
      border-collapse: collapse;
      width: 50%;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    th,
    td {
      padding: 12px;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #e2e8fc;
      color: #2a2c3e;
    }
  `;

  _receiveDataAndFillTheStateValues = (e) => {
    this._fname = e.detail.fname;
    this._monsterFeatures = e.detail.monsterFeaturesArray;
    this._car = e.detail.car;
    this._maintenanceDrones = e.detail.maintenanceDronesArray;
  };

  constructor() {
    super();
    this.addEventListener(
      "fillDataInDataDisplayer",
      this._receiveDataAndFillTheStateValues
    );
  }

  render() {
    return html`
      <table id="data-displayer">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Monster Features</th>
            <th>_car</th>
            <th>Maintenance Drone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${this._fname}</td>
            <td>${this._monsterFeatures?.toString()}</td>
            <td>${this._car}</td>
            <td>${this._maintenanceDrones}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

customElements.define("data-displayer", DataDisplayer);
