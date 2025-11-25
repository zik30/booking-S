type Options = {
  label: string;
  value: string;
};

export interface ToggleSwitchProps {
  options: Options[];
  selected: string;
  setSelected: (val: string) => void;
}
