/**
 * Validates values of the form.
 * @constructor
 * @param {{fname:string, monsterFeatures:[],car:string, maintenanceDrones:[] }} values -The values from the form
 */
export const validateForm = (values) => {
  const { fname, monsterFeatures, car, maintenanceDrones } = values;
  //cases which form shouldn't submit
  if (!fname || fname?.length === 0) {
    return false;
  }

  if (!monsterFeatures || monsterFeatures?.length === 0) {
    return false;
  }

  if (!car) {
    return false;
  }
  if (!maintenanceDrones || maintenanceDrones?.length === 0) {
    return false;
  }

  return true;
};
/**
 * Parses values of the form.
 * @constructor
 * @param {{fname:string, monsterFeatures:[],car:string, maintenanceDrones:[] }} values - The values from the form
 */
export const parseValues = (values) => {
  const { fname, monsterFeatures, car, maintenanceDrones } = values;
  let monsterFeaturesArray;
  let maintenanceDronesArray;
  try {
    monsterFeaturesArray = monsterFeatures?.filter(
      (feature) => feature.checked
    );
    monsterFeaturesArray = monsterFeaturesArray?.map((element) => element.name);
  } catch (e) {
    monsterFeaturesArray = [];
  }
  try {
    maintenanceDronesArray = maintenanceDrones?.filter(
      (drone) => drone.checked
    );
    maintenanceDronesArray = maintenanceDronesArray?.map(
      (element) => element.value
    );
  } catch (e) {
    maintenanceDronesArray = [];
  }

  return {
    fname,
    monsterFeaturesArray,
    car,
    maintenanceDronesArray,
  };
};

/**
 * Sends values of the form.
 * @constructor
 * @param {{fname:string, monsterFeaturesArray:[],car:string, maintenanceDronesArray:[] }} parsedValues - The values from the form after being parsed
 * @param customForm - The instance of the CustomForm
 */
export const sendEventWithDataToParentComponent = (
  parsedValues,
  customForm
) => {
  //in here we access the parent of parent component to trigger its listeer
  // it is the data-displayer component (DataDisplayer.js )
  customForm.parentNode.parentNode
    .querySelector("data-displayer")
    .dispatchEvent(
      new CustomEvent("fillDataInDataDisplayer", {
        detail: parsedValues,
        bubbles: true,
        composed: true,
      })
    );
};

export const closeParentModal = (customForm) => {
  customForm.parentNode.dispatchEvent(
    new CustomEvent("forceCloseModal", {
      bubbles: true,
      composed: true,
    })
  );
};
