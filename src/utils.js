export const createField = ({
    label,
    name,
    defaultValue,
    fieldType,
    fieldType2,
    description,
    fixedLength,
    minLength,
    maxLength,
    minValue,
    maxValue,
    fieldValues,
    acceptedFormats,
    maxFileSize,
    regexp,
    caption,
    maxDate
  } = {}) => {
    var fieldObject = {};
    fieldObject.name = name;
    fieldObject.label = label;
    fieldObject.defaultValue = defaultValue;
    fieldObject.fieldType = fieldType;
    fieldObject.fieldType2 = fieldType2;
    fieldObject.description = description;
    fieldObject.fixedLength = fixedLength;
    fieldObject.minLength = minLength;
    fieldObject.maxLength = maxLength;
    fieldObject.minValue = minValue;
    fieldObject.maxValue = maxValue;
    fieldObject.fieldValues = fieldValues;
    fieldObject.acceptedFormats = acceptedFormats;
    fieldObject.maxFileSize = maxFileSize;
    fieldObject.regexp = regexp;
    fieldObject.caption = caption;
    fieldObject.maxDate = maxDate;
    return fieldObject;
  };