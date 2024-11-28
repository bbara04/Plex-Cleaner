
export function TextInputField({label, placeholder}: TextInputFieldProps) {
    return <div class="flex items-center justify-between p-4 space-x-6 border-2 rounded-md bg-slate-900 border-slate-700">
        <span>{label}:</span>
        <input class="py-2 px-4 min-w-36 max-w-48 rounded-sm text-white placeholder-slate-200 bg-gray-600" type="text" placeholder={placeholder}/>
    </div>
}

export type TextInputFieldProps = {
    label: string;
    placeholder: string;
}