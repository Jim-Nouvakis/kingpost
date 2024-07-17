import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

class DataDisplayer extends LitElement {
  static get properties() {
    return {
      fname: { state: true },
      monsterFeatures: { state: true },
      car: { state: true },
      maintenanceDrones: { state: true },
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
      background-color: #007bff;
      color: white;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }
  `;

  _receiveDataAndFillTheStateValues = (e) => {
    this.fname = e.detail.fname;
    this.monsterFeatures = e.detail.monsterFeaturesArray;
    this.car = e.detail.car;
    this.maintenanceDrones = e.detail.maintenanceDronesArray;
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
            <th>Car</th>
            <th>Maintenance Drone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${this.fname}</td>
            <td>${this.monsterFeatures?.toString()}</td>
            <td>${this.car}</td>
            <td>${this.maintenanceDrones}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
}

customElements.define("data-displayer", DataDisplayer);
