import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function InputField({
  name,
  label,
  type,
  required,
  variant,
  placeholder,
  sx,
  ...props
}) {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext();

  const showError = !!errors && touchedFields;

  {
    console.log("errors", errors);
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <TextField
          id={name}
          name={name}
          label={label}
          type={type}
          required={required}
          variant={variant}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value ?? ""}
          inputRef={ref}
          error={showError}
          helperText={showError ? errors[name]?.message : ""}
          sx={{ ...styles.inputField, ...sx }}
          size="small"
          fullWidth
          {...props}
        />
      )}
    />
  );
}

const styles = {
  inputField: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
    },
  },
};

export default InputField;
