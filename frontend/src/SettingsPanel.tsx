import Scrollbar from "react-scrollbars-custom";
import { NumberInputField } from "./InputFields/NumberInputField";
import { TextInputField } from "./InputFields/TextInputField";
import { ServiceSettingsPanel } from "./ServiceSettingsPanel";
import { IconButton } from "./IconButton";
import { FaSave } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useEffect, useRef, useState } from "preact/hooks";
import axios from "axios";
import { WaitingPanel } from "./WaitingPanel";
import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**
 * A `SettingsPanel` komponens a konfigurációs beállítások kezelésére szolgál.
 * 
 * A panel betölti a konfigurációs adatokat egy API hívásból, lehetővé téve a felhasználók számára, hogy módosítsák azokat.
 * A konfiguráció mentéséhez egy `saveConfig` függvényt biztosít, amely szinkronizálja az adatokat a backend rendszerrel.
 * A panel tartalmazza a különböző beállításokat, mint a szerver IP címe, portja, valamint a Plex, Tautulli, Sonarr és Radarr szolgáltatások konfigurációs mezőit.
 * 
 * @param {Object} props - A komponens props objektuma.
 * @param {Function} props.onClose - Függvény, amely bezárja a panelt, ha meghívásra kerül.
 * 
 * @returns {JSX.Element} A beállítások panel JSX eleme.
 */
export function SettingsPanel({ onClose }: { onClose: () => void }) {

    const config = useRef<Config>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchConfig = () => {
            axios.get("/api/config")
                .then((response) => {
                    config.current = response.data;
                })
                .catch((error) => {
                    setError(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        fetchConfig();
    }, []);

    // Ha az adatok betöltése folyamatban van
    if (loading) {
        return <div class="overflow-y-hidden h-screen">
            <WaitingPanel message="Loading..." />
        </div>
    }

    // Ha hiba történt az adatok betöltése során
    if (error) {
        return <div class="overflow-y-hidden h-screen">
            <WaitingPanel message="Something went wrong..." color="#400709" />
        </div>
    }

    /**
     * Frissíti a konfigurációt a megadott elérési úton és értékkel.
     * 
     * @param {string} path - Az elérési út a konfigurációban, amely tartalmazza a frissítendő értéket.
     * @param {any} value - Az új érték, amelyet a konfigurációba írunk.
     */
    const handleConfigChange = (path: string, value: any) => {
        if (config.current) {
            const keys = path.split('.');
            let current = config.current;
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]] as any;
            }
            current[keys[keys.length - 1]] = value; // Update the value in the ref
        }
    };

    /**
     * Mentés funkció, amely a módosított konfigurációt visszaküldi a backend rendszerbe.
     */
    function saveConfig() {
        setLoading(true);

        axios.put("/api/config", config.current)
            .then((response) => {
                toast.success("Config saved successfully!");
                console.log(response);
            })
            .catch((error) => {
                toast.error("Failed to save config!");
                console.error(error);
            })
            .finally(() => setLoading(false));
    }

    return (
        <div>
            <Scrollbar style={{ height: '90vh' }}>
                <div className="flex justify-center m-8">
                    <div className="space-y-4 mt-12 min-w-fit max-w-fit min-h-fit">
                        <TextInputField label="Ip address" value={config.current.server.ip} configPath="server.ip" onChange={handleConfigChange} placeholder="localhost" />
                        <NumberInputField label="Port" value={config.current.server.port} configPath="server.port" onChange={handleConfigChange} />
                        <NumberInputField label="Movie delete threshold" value={config.current.radarr.delete_after_days} configPath="radarr.delete_after_days" onChange={handleConfigChange} />
                        <NumberInputField label="Tv show delete threshold" value={config.current.sonarr.delete_after_days} configPath="sonarr.delete_after_days" onChange={handleConfigChange} />
                        <ServiceSettingsPanel name="Plex" serviceConfig={config.current.plex} configPath="plex" onChange={handleConfigChange} />
                        <ServiceSettingsPanel name="Tautulli" serviceConfig={config.current.tautulli} configPath="tautulli" onChange={handleConfigChange} />
                        <ServiceSettingsPanel name="Sonarr" serviceConfig={config.current.sonarr} configPath="sonarr" onChange={handleConfigChange} />
                        <ServiceSettingsPanel name="Radarr" serviceConfig={config.current.radarr} configPath="radarr" onChange={handleConfigChange} />
                    </div>
                </div>
            </Scrollbar>
            <div class="fixed top-16 right-2 bg-slate-800 rounded-md">
                <IconButton Icon={IoMdClose} size={"24px"} onClick={() => onClose()}></IconButton>
            </div>
            <div class="fixed bottom-4 left-1/2 transition -translate-x-1/2 bg-slate-800 rounded-lg">
                <IconButton Icon={FaSave} size={"28px"} onClick={() => saveConfig()} text="Save"></IconButton>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
                transition={Bounce}
            />
        </div>
    );
}

/**
 * A konfiguráció típusa, amely tartalmazza a szolgáltatások és szerverek beállításait.
 * 
 * @typedef {Object} Config
 * @property {string[]} excluded_lines - Az elhagyott sorok listája.
 * @property {Object} plex - Plex szolgáltatás beállításai.
 * @property {Object} radarr - Radarr szolgáltatás beállításai.
 * @property {Object} server - A szerver IP címét és portját tartalmazza.
 * @property {Object} sonarr - Sonarr szolgáltatás beállításai.
 * @property {Object} tautulli - Tautulli szolgáltatás beállításai.
 */
type Config = {
    excluded_lines: string[];
    plex: {
        api: string;
        port: number;
    };
    radarr: {
        api: string;
        delete_after_days: number;
        port: number;
    };
    server: {
        ip: string;
        port: number;
    };
    sonarr: {
        api: string;
        delete_after_days: number;
        port: number;
    };
    tautulli: {
        api: string;
        port: number;
    };
};
