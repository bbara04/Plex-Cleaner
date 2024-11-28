import { useState } from "preact/hooks"
import { TextInputField } from "./InputFields/TextInputField";
import { NumberInputField } from "./InputFields/NumberInputField";
import { IconButton } from "./IconButton";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

export function ServiceSettingsPanel({ name }: ServiceSettingsPanelProps) {
    const [open, setOpen] = useState(false);
    return <div class="flex flex-col items-center space-y-4 border-2 rounded-md bg-slate-900 border-slate-700">
        <div class="flex items-center p-4 w-full justify-between" onClick={() => setOpen(!open)}>
            <span class="">{name}</span>
            {open ? <IoIosArrowDropup size="20px"/> : <IoIosArrowDropdown size="20px"/>}
        </div>
        {open &&
            <div class="space-y-4 pb-8">
                <TextInputField label="api" placeholder="api" />
                <NumberInputField label="port" value={1234} />
            </div>}
    </div>
}

export type ServiceSettingsPanelProps = {
    name: String;
}