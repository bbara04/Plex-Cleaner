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

export function SettingsPanel({ onClose }: { onClose: () => void }) {

    const config = useRef<Config>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchConfig = () => {
            axios.get("http://localhost:5000/api/config")
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

    if (loading) {
        return <div class="overflow-y-hidden h-screen">
            <WaitingPanel message="Loading..." />
        </div>
    }

    if (error) {
        return <div class="overflow-y-hidden h-screen">
            <WaitingPanel message="Something went wrong..." color="#400709" />
        </div>
    }

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

    function saveConfig() {
        setLoading(true);

        axios.put("http://localhost:5000/api/config", config.current)
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
            <Scrollbar style={{ height: '92vh' }}>
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
            <div class="fixed top-20 right-6 bg-slate-900 rounded-md">
                <IconButton Icon={IoMdClose} size={"32px"} onClick={() => onClose()}></IconButton>
            </div>
            <div class="fixed bottom-4 left-1/2 transition -translate-x-1/2 bg-slate-800 rounded-lg">
                <IconButton Icon={FaSave} size={"32px"} onClick={() => saveConfig()} text="Save"></IconButton>
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