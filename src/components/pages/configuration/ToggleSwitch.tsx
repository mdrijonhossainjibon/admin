import { useEffect, useState } from "react";
import { Switch } from "antd";

interface Props<T extends object> {
  value: T;
  name: keyof T;
  onChange: (variables: T) => void;
  error: any;
}

export default function <T extends object>({ value, name, onChange, error }: Props<T>) {
  const [toggleValue, setToggleValue] = useState(value[name]);

  const handleToggle = (variables: typeof value) => {
    onChange(variables);
    setToggleValue(variables[name]);
  };

  useEffect(() => {
    if (error) {
      setToggleValue(value[name]);
    }
  }, [error]);

  return (
    <Switch
      size="small"
      checked={!!toggleValue}
      onClick={(_, e) => e.stopPropagation()}
      onChange={(val) => handleToggle({ ...value, [name]: val })}
    />
  );
}
