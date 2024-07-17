export const resetForm = (customModal) => {
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

export const submitForm = (customModal) => {
  //look line 8 to 10 for explanation inside resetForm function
  const slottedElements = customModal.shadowRoot
    .querySelector("slot")
    .assignedElements();
  slottedElements.forEach((element) =>
    element.dispatchEvent(new Event("submitForm"))
  );
};
