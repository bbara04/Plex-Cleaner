import { NumberInputField } from "./InputFields/NumberInputField";
import { TextInputField } from "./InputFields/TextInputField";
import { ServiceSettingsPanel } from "./ServiceSettingsPanel";

export function SettingsPanel() {
    return <div>
        <TextInputField label="Ip address" placeholder="localhost"/>
        <NumberInputField label="Movie delete threshold" value={30}/>
        <NumberInputField label="Tv show delete threshold" value={30}/>
        <ServiceSettingsPanel name="Plex"/>
        <ServiceSettingsPanel name="Tautulli"/>
        <ServiceSettingsPanel name="Sonarr"/>
        <ServiceSettingsPanel name="Radarr"/>
    </div>
}