import { Select } from "antd";

interface Props{
    onChange: any;
    optionArray:any;
    placeholder?: string;
    value?:number | null | (number | undefined)[] | string
    defaultValue?:number | null | (number | undefined)[] | string
    disabled?:boolean
    mode?: undefined | "multiple"
}

export function Selector({onChange, optionArray, placeholder, value,defaultValue,disabled,mode}:Props){
    return(
        <Select
                mode={mode ? "multiple" : undefined}
                showSearch
                style={{ width: 200 }}
                onChange={onChange}
                placeholder={placeholder}
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options = {optionArray}
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
            />
    )
}