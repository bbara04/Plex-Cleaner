import { useState } from "preact/hooks";
import { TextInputField } from "./InputFields/TextInputField";
import { NumberInputField } from "./InputFields/NumberInputField";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";

/**
 * A `ServiceSettingsPanel` komponens egy beállítások panel, amely lehetővé teszi egy szolgáltatás konfigurációjának módosítását.
 * 
 * A panel tartalmazza a szolgáltatás nevét, és ha kinyitjuk, akkor megjeleníti az API cím és port mezőket. 
 * Az adatok frissítése az `onChange` függvény segítségével történik, amely a változásokat az adott `configPath` alapján frissíti.
 * 
 * @param {ServiceSettingsPanelProps} props - A komponens props objektuma.
 * @param {string} props.name - A szolgáltatás neve, amelyet a panelen megjelenítünk.
 * @param {Object} props.serviceConfig - A szolgáltatás konfigurációja, amely tartalmazza az `api` és `port` értékeket.
 * @param {string} props.configPath - A konfiguráció elérési útja, amely segít az adatfrissítés során.
 * @param {(path: string, value: string) => void} props.onChange - Függvény, amely frissíti a konfiguráció értékét.
 * 
 * @returns {JSX.Element} A szolgáltatás beállításait tartalmazó panel JSX eleme.
 */
export function ServiceSettingsPanel({ name, serviceConfig, configPath, onChange }: ServiceSettingsPanelProps) {
    const [open, setOpen] = useState(false);
    return (
        <div class="flex flex-col items-center space-y-4 border-2 rounded-md bg-slate-900 border-slate-700">
            <div class="flex items-center p-4 w-full justify-between" onClick={() => setOpen(!open)}>
                <span className="">{name}</span>
                {open ? <IoIosArrowDropup size="20px" /> : <IoIosArrowDropdown size="20px" />}
            </div>
            {open &&
                <div class="space-y-4 pb-8">
                    <TextInputField label="api" value={serviceConfig.api} placeholder="api" configPath={`${configPath}.api`} onChange={onChange} />
                    <NumberInputField label="port" value={serviceConfig.port} configPath={`${configPath}.port`} onChange={onChange} />
                </div>}
        </div>
    );
}

/**
 * `ServiceSettingsPanelProps` típus, amely meghatározza a `ServiceSettingsPanel` komponens bemeneti propjait.
 * 
 * @typedef {Object} ServiceSettingsPanelProps
 * @property {string} name - A szolgáltatás neve.
 * @property {Object} serviceConfig - A szolgáltatás konfigurációja, amely `api` és `port` értékeket tartalmaz.
 * @property {string} configPath - A konfiguráció elérési útja.
 * @property {(path: string, value: string) => void} onChange - Függvény, amely a konfiguráció értékeit frissíti.
 */
export type ServiceSettingsPanelProps = {
    name: string;
    serviceConfig: { api: string; port: number };
    configPath: string;
    onChange: (path: string, value: string) => void;
};
