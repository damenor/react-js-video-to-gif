import React, { useState, useEffect } from 'react'

import { useFormDynamic } from '../hooks/useFormDynamic'

export const getInitialValues = (inputs) => {
  let initialValues = {}
  inputs.forEach(input => initialValues[input.name] = input.value)
  return initialValues
}

export const FormDynamic = ({ inputs, onTouched, onSubmit, title = null, titleSubmit = 'Submit' }) => {
  
  const [initialValues] = useState(getInitialValues(inputs))

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
    submit: (values) => {
      onSubmit(values)
      console.log({values, errors, touched})
    }
  })

  useEffect(() => onTouched ? onTouched(touched): null, [touched])

  const getClassError = (name) => errors[name] ? 'form__input--error': ''

  return (
    <form onSubmit={handleSubmit} className="form">
      { title && <h1>{title}</h1>}

      {
        inputs.map((input, i) => (
          <div className={`form__input ${getClassError(input.name)}`} key={`input-${i}-${input.name}`}>
            <label htmlFor={input.name}>{input.label}</label>
            <input
              type={input.type}
              name={input.name}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values[input.name]}
              {...input.props}
            />
          </div>
        ))  
      }

      <button className="form__button" type="submit">{titleSubmit}</button>
    </form>
  )

}
