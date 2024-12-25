import { IoClose } from "react-icons/io5";
import { MdSelectAll } from "react-icons/md";
import { MdDeselect } from "react-icons/md";
import { useMediaContext } from "./MediaContext";
import { Media } from ".";
import { forceReRenderMedia } from "./MediaPanel";

/**
 * A CloseableActionPanel komponens egy felugró panel, amely két gombot tartalmaz:
 * egyet minden elem kiválasztásához, és egyet a kiválasztás eltávolításához.
 * A panel bezárható az "onClose" callback segítségével.
 *
 * @param {CloseablePanelProps} props A komponens paraméterei.
 * @returns {JSX.Element} A komponens JSX eleme.
 */
export function CloseableActionPanel({ onClose }: CloseablePanelProps) {
    // A médiák lekérése a MediaContext-ből
    const medias = useMediaContext().current as Media[];

    /**
     * Az összes elem kiválasztásának vagy eltávolításának művelete.
     * 
     * @param {boolean} type Ha true, akkor kiválasztja az összes médiát, ha false, akkor eltávolítja a kiválasztást.
     */
    function allSelectAction(type: boolean) {
        medias.forEach(m => m.checked = type); // Minden médiára alkalmazza a kiválasztás állapotát
        forceReRenderMedia(); // Újrarendereli a médiákat
    }

    return (
        <div class="flex flex-col bg-slate-900 border-4 border-slate-700 rounded-xl">
            {/* A bezárás gomb */}
            <div class="ml-auto">
                <button class="rounded-md pt-2 pr-2" onClick={() => onClose()}>
                    <IoClose size="24px" />
                </button>
            </div>
            {/* Két akciógomb: Select All és Deselect */}
            <div class="flex flex-col p-4 space-y-4">
                <button class="bg-slate-400 text-black font-medium p-2 rounded-xl" onClick={() => allSelectAction(true)}>
                    <MdSelectAll size="24px" />
                    <span>Select All</span>
                </button>
                <button class="bg-slate-400 text-black font-medium p-2 rounded-xl" onClick={() => allSelectAction(false)}>
                    <MdDeselect size="24px" />
                    <span>Deselect</span>
                </button>
            </div>
        </div>
    );
}

/**
 * A CloseablePanelProps típus definiálja a CloseableActionPanel komponenshez szükséges paramétereket.
 * @typedef {Object} CloseablePanelProps
 * @property {() => void} onClose - A callback függvény, amely bezárja a panelt.
 */
export type CloseablePanelProps = {
    onClose(): void;
}
