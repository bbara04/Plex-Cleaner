import { useState } from "preact/hooks"
import { TextInputField } from "./InputFields/TextInputField";
import { NumberInputField } from "./InputFields/NumberInputField";

export function ServiceSettingsPanel({name}: ServiceSettingsPanelProps) {
    const [open, setOpen] = useState(false);
    return <div>
        <button onClick={() => setOpen(!open)}>{name}</button>
        {open &&
            <div>
                <TextInputField label="api" placeholder="api" />
                <NumberInputField label="port" value={1234} />
            </div>}
    </div>
}

export type ServiceSettingsPanelProps = {
    name: String;
}