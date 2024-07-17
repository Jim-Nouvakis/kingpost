export const validateForm = (values) => {
  const { fname, monsterFeatures, car, maintenanceDrones } = values;
  //cases which form shouldn't submit
  if (!fname || fname?.length === 0) {
    console.log("line17");
    return false;
  }

  if (!monsterFeatures || monsterFeatures?.length === 0) {
    console.log("line22");
    return false;
  }

  if (!car) {
    console.log("line28");
    return false;
  }
  if (!maintenanceDrones || maintenanceDrones?.length === 0) {
    console.log("line33");
    return false;
  }

  return true;
};

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

  console.log("@line62");
  return {
    fname,
    monsterFeaturesArray,
    car,
    maintenanceDronesArray,
  };
};
