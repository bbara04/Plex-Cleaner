
export function TextInputField({label, value, configPath, placeholder, onChange}: TextInputFieldProps) {
    return <div class="flex items-center justify-between p-4 space-x-6 border-2 rounded-md bg-slate-900 border-slate-700">
        <span>{label}:</span>
        <input class="py-2 px-4 min-w-36 max-w-48 rounded-sm text-white placeholder-slate-200 bg-gray-600" type="text" value={value} placeholder={placeholder} onInput={e => onChange(configPath, (event.target as HTMLInputElement).value)}/>
    </div>
}

export type TextInputFieldProps = {
    label: string;
    value: string; 
    configPath: string;
    placeholder: string;
    onChange: (path: string, value: string) => void;
}