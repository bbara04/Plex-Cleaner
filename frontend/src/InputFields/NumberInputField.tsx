export function NumberInputField({label, value, configPath, onChange}: NumberInputFieldProps) {
    return <div class="flex justify-between items-center p-4 space-x-6 border-2 rounded-md bg-slate-900 border-slate-700">
        <span>{label}:</span>
        <input class="p-2 min-w-20 max-w-24 rounded-sm text-center text-white placeholder-slate-200 bg-gray-600" type="number" value={value} onInput={e => onChange(configPath, (event.target as HTMLInputElement).value)}/>
    </div>
}

export type NumberInputFieldProps = {
    label: string;
    value: number;
    configPath: string;
    onChange: (path: string, value: string) => void;
}