import React from "react";
import TextInput from "./controls/TextInput";
import FormSelect from "./controls/Select";
import CheckBox from "./controls/CheckBox";
import DatePickerWrapper from "./controls/DatePicker";
import FileUpload from "./controls/FileUpload";
import { addValidationRule } from "formsy-react";
import Constants from "../../../configurations/constants";


class InputControls extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const {
      field,
      formData,
      disableFields
    } = this.props;

    const fieldObject = field.fieldObject;

    const setValidations = {
      isNumeric: fieldObject.fieldType === "Number" ? true : undefined,
      isInt: fieldObject.fieldType2 === "Integer" ? true : undefined,
      isLength: fieldObject.fixedLength,
      minLength: fieldObject.minLength,
      maxLength: fieldObject.maxLength,
      minValue: fieldObject.minValue,
      maxValue: fieldObject.maxValue,
    };

    const setvalidationErrors = {
      isNumeric:
        fieldObject.fieldType === "Number"
          ? "You have to enter a valid number"
          : undefined,
      isInt:
        fieldObject.fieldType2 === "Integer"
          ? "You have to enter a valid whole number"
          : undefined,
      isLength:
        fieldObject.fixedLength && `Only ${fieldObject.fixedLength} characters`,
      minLength:
        fieldObject.minLength &&
        `Minimum of ${fieldObject.minLength} characters allowed`,
      maxLength:
        fieldObject.maxLength &&
        `Maximum of ${fieldObject.maxLength} characters allowed`,
      minValue:
        fieldObject.minValue &&
        `Enter a value greater than ${fieldObject.minValue}`,
      maxValue:
        fieldObject.maxValue &&
        `Enter a value less than ${fieldObject.maxValue}`,
      acceptedFormat:
        fieldObject.acceptedFormats &&
        `Only files formats (${fieldObject.acceptedFormats.join(
          ", "
        )}) are allowed`,
      maxFileSize:
        fieldObject.maxFileSize &&
        `File must not be larger than ${Math.floor(
          fieldObject.maxFileSize / 1000
        )}KB`,
      phoneNumberValidation:
        fieldObject.fieldType2 === "PhoneNumber"
          ? "Invalid phone number (7 - 13 digits allowed)"
          : undefined,
      settlementAmount:
        fieldObject.fieldType2 === "Money"
          ? ` Amount must be greater than zero and not more than the settlement amount: ${
              transactionDetails.settlementAmount
            }`
          : undefined
    };

    // Strip undefined variables
    const validations = JSON.parse(JSON.stringify(setValidations));
    const validationErrors = JSON.parse(JSON.stringify(setvalidationErrors));
    const inputName = fieldObject.name;



    const isRequired = () => {
      if (field.isRequired) {
        return true;
      }
      return false;
    };

    return (
      <div>
        {!isHidden() &&
          {
            String: (
              <TextInput
                name={inputName}
                value={formData[inputName]}
                label={fieldObject.label}
                description={fieldObject.description}
                caption={fieldObject.caption}
                validations={validations}
                validationErrors={validationErrors}
                required={isRequired()}
                placeHolder={fieldObject.label}
                multiline={fieldObject.maxLength >= 200 && true}
                formData={formData}
                disableFields={disableFields}
                transactionDetails={transactionDetails}
              />
            ),
            Number: (
              <TextInput
                name={inputName}
                value={formData[inputName]}
                description={fieldObject.description}
                label={fieldObject.label}
                validations={validations}
                caption={fieldObject.caption}
                validationErrors={validationErrors}
                type="number"
                placeHolder={fieldObject.label}
                currency={fieldObject.fieldType2 === "Money" && true}
                required={isRequired()}
                formData={formData}
                disableFields={disableFields}
                transactionDetails={transactionDetails}
              />
            ),
            Array: (
              <FormSelect
                name={inputName}
                label={fieldObject.label}
                validations={validations}
                validationErrors={validationErrors}
                caption={fieldObject.caption}
                options={fieldObject.fieldValues}
                valueKey="value"
                value={formData[inputName] || fieldObject.defaultValue}
                placeHolder={fieldObject.label}
                required={isRequired()}
                labelKey="description"
                formData={formData}
                disableFields={disableFields}
                description={fieldObject.description}
                transactionDetails={transactionDetails}
              />
            ),
            Boolean: (
              <CheckBox
                name={inputName}
                label={fieldObject.label}
                validations={validations}
                caption={fieldObject.caption}
                value={formData[inputName]}
                validationErrors={validationErrors}
                selectedCode={selectedCode}
                required={isRequired()}
                formData={formData}
                disableFields={disableFields}
                description={fieldObject.description}
                transactionDetails={transactionDetails}
              />
            ),
            Date: (
              <DatePickerWrapper
                name={inputName}
                label={fieldObject.label}
                maxDate={fieldObject.maxDate}
                validations={validations}
                placeHolder={fieldObject.label}
                required={isRequired()}
                caption={fieldObject.caption}
                validationErrors={validationErrors}
                dateFormat={Constants.DATE_FORMAT}
                disabledKeyboardNavigation={true}
                peekNextMonth={true}
                showMonthDropdown={true}
                showYearDropdown={true}
                value={formData[inputName]}
                readOnly={true}
                dropdownMode="select"
                formData={formData}
                disableFields={disableFields}
                description={fieldObject.description}
                transactionDetails={transactionDetails}
              />
            ),
            File: (
              <FileUpload
                name={inputName}
                label={fieldObject.label}
                caption={fieldObject.caption}
                description={fieldObject.description}
                required={isRequired()}
                validations={validations}
                value={formData[inputName]}
                validationErrors={validationErrors}
                acceptedFormats={fieldObject.acceptedFormats}
                formData={formData}
                disableFields={disableFields}
                transactionDetails={transactionDetails}
              />
            )
          }[fieldObject.fieldType]}
      </div>
    );
  }
}

export default InputControls;