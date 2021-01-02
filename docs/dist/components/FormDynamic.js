import React, {useState, useEffect} from "../../web_modules/react.js";
import {useFormDynamic} from "../hooks/useFormDynamic.js";
export const getInitialValues = (inputs) => {
  let initialValues = {};
  inputs.forEach((input) => initialValues[input.name] = input.value);
  return initialValues;
};
export const FormDynamic = ({inputs, onTouched, onSubmit, title = null, titleSubmit = "Submit"}) => {
  const [initialValues] = useState(getInitialValues(inputs));
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors
  } = useFormDynamic({
    initialValues,
    submit: (values2) => {
      onSubmit(values2);
      console.log({values: values2, errors, touched});
    }
  });
  useEffect(() => onTouched ? onTouched(touched) : null, [touched]);
  const getClassError = (name) => errors[name] ? "form__input--error" : "";
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit: handleSubmit,
    className: "form"
  }, title && /* @__PURE__ */ React.createElement("h1", null, title), inputs.map((input, i) => /* @__PURE__ */ React.createElement("div", {
    className: `form__input ${getClassError(input.name)}`,
    key: `input-${i}-${input.name}`
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: input.name
  }, input.label), /* @__PURE__ */ React.createElement("input", {
    type: input.type,
    name: input.name,
    onBlur: handleBlur,
    onChange: handleChange,
    value: values[input.name],
    ...input.props
  }))), /* @__PURE__ */ React.createElement("button", {
    className: "form__button",
    type: "submit"
  }, titleSubmit));
};
