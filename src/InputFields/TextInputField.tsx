
export function TextInputField({label, placeholder}: TextInputFieldProps) {
    return <div class="flex p-4 border-2 border-blue-800 rounded-md space-x-4">
        <span>{label}</span>
        <input class="bg-gray-900 p-2 text-white placeholder-slate-200" type="text" placeholder={placeholder}/>
    </div>
}

export type TextInputFieldProps = {
    label: string;
    placeholder: string;
}