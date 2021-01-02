import { useState, useEffect, useRef } from "react"

export const useFormDynamic = ({ initialValues, submit }) => {

  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const formRendered = useRef(true)

  useEffect(() => {
    if (!formRendered.current) {
      setValues(initialValues)
      setErrors({})
      setTouched({})
    }
    formRendered.current = false
  }, [initialValues])

  const handleChange = (event) => {
    const { target } = event
    const { name, value } = target
    event.persist()
    setValues({ ...values, [name]: value })
  }

  const handleBlur = (event) => {
    const { target } = event
    const { name } = target
    setTouched({ ...touched, [name]: true })
  }

  const handleSubmit = (event) => {
    if (event) event.preventDefault()
    submit({ ...values })
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setErrors
  }
  
}
