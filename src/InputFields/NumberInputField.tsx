export function NumberInputField({label, value}: NumberInputFieldProps) {
    return <div class="flex p-4 border-2 border-blue-800 rounded-md space-x-4">
        <span>{label}</span>
        <input type="number" value={value}/>
    </div>
}

export type NumberInputFieldProps = {
    label: string;
    value: number;
}