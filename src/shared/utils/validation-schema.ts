import * as yup from "yup";
import { ObjectSchema } from "yup";

export const getValidationSchema = (fields = []): ObjectSchema<any> => {
  if (fields.length === 0) {
    return yup.object().shape({});
  }
  const schema = fields.reduce((schema, field) => {
    const {
      name,
      validationType,
      validationTypeError,
      validations = [],
    } = field;
    const isObject = name.indexOf(".") >= 0;
    if (!name) {
      return;
    }

    if (validationType === "array_of_string") {
      let validator = yup.array().of(yup.string());
      validations.forEach((validation) => {
        const { params, type } = validation;
        if (!validator[type]) {
          return;
        }
        validator = validator[type](...params);
      });
      return schema.concat(yup.object().shape({ [name]: validator }));
    }

    if (!yup[validationType]) {
      return schema;
    }

    let validator = yup[validationType]().typeError(validationTypeError || "");
    validations.forEach((validation) => {
      const { params, type } = validation;
      if (!validator[type]) {
        return;
      }
      validator = validator[type](...params);
    });

    if (!isObject) {
      return schema.concat(yup.object().shape({ [name]: validator }));
    }

    const reversePath = name.split(".").reverse();
    const currNestedObject = reversePath.slice(1).reduce(
      (yupObj, path, index, source) => {
        if (!isNaN(path)) {
          return { array: yup.array().of(yup.object().shape(yupObj)) };
        }
        if (yupObj.array) {
          return { [path]: yupObj.array };
        }
        return { [path]: yup.object().shape(yupObj) };
      },
      { [reversePath[0]]: validator }
    );

    const newSchema = yup.object().shape(currNestedObject);
    return schema.concat(newSchema);
  }, yup.object().shape({}));

  return schema;
};
