import {
  Controller,
  FieldValues,
  useFormContext,
  UseFormWatch,
} from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from '@mui/material';
import { FormFieldDataType } from '../../types/formsTypes.ts';

interface FormSelectProps extends SelectProps {
  name: string;
  listData: FormFieldDataType[];
  getDependentValue?: (watchFunction: UseFormWatch<FieldValues>) => string;
}

function FormSelect(props: FormSelectProps) {
  const {
    name,
    listData,
    getDependentValue,
    readOnly,
    value,
    onChange,
    label,
    size,
    ...otherProps
  } = props;
  const { control, watch, setValue } = useFormContext();

  const dependentValue = getDependentValue?.(watch);

  if (dependentValue) {
    setValue(name, dependentValue);
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({ field: { onChange, value }, fieldState, formState }) => (
        <FormControl fullWidth>
          <InputLabel id={label}>{label}</InputLabel>
          <Select
            labelId={label}
            value={dependentValue ?? value ?? ''}
            label={label}
            onChange={onChange}
            error={!!formState.errors[name]}
            helpertext={formState.errors[name]?.message}
            readOnly={getDependentValue ? true : readOnly}
            {...otherProps}
          >
            {listData?.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

export default FormSelect;
