function userInputValidation(inputData, inputKey) {
  let validationRules = inputData[inputKey].validations;
  let isValid = true;
  let errorMSG = null;
  if (validationRules.required && isValid) {
    if (inputData[inputKey].properties.value.trim() !== "") isValid = true;
    else isValid = false;
    errorMSG = !isValid ? "user should enter this field mandatorily" : null;
  }
  return { isValid, errorMSG };
}

function UserFormData(event, inputKey, state) {
  let stateCopy = { ...state };
  let nestedStateCopyOne = { ...stateCopy[inputKey] };
  let nestedStateCopyTwo = { ...nestedStateCopyOne.properties };
  nestedStateCopyTwo.value = event.target.value;
  nestedStateCopyOne.properties = nestedStateCopyTwo;
  stateCopy[inputKey] = nestedStateCopyOne;

  const { isValid, errorMSG } = userInputValidation(stateCopy, inputKey);

  nestedStateCopyTwo.valid = isValid;
  nestedStateCopyTwo.errorMSG = errorMSG;
  nestedStateCopyTwo.touched = true;
  nestedStateCopyOne.properties = nestedStateCopyTwo;
  stateCopy[inputKey] = nestedStateCopyOne;

  return stateCopy;
}

export { UserFormData };
