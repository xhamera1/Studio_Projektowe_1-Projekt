import * as React from 'react';
import { type Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(optionValue: number | string, selectedValues: (number | string)[], theme: Theme) {
  const includes = selectedValues.map(String).includes(String(optionValue));
  return {
    fontWeight: includes ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect(props: {
  id: string;
  label: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: boolean;
  helperText?: string;
  surveyOptions: string[];
}) {
  const theme = useTheme();
  const [internalValue, setInternalValue] = React.useState<string[]>([]);
  const value = props.value ?? internalValue;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const raw = event.target.value;
    const next: string[] = Array.isArray(raw) ? raw.map((v: unknown) => String(v)) : [];
    if (props.onChange) props.onChange(next);
    if (props.value === undefined) setInternalValue(next);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} error={props.error}>
        <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
        <Select
          labelId={`${props.id}-label`}
          id={props.id}
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput label={props.label} />}
          MenuProps={MenuProps}
        >
          {props.surveyOptions.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, value, theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
        {props.helperText ? <FormHelperText>{props.helperText}</FormHelperText> : null}
      </FormControl>
    </div>
  );
}