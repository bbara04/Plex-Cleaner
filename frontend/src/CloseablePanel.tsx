import { IoClose } from "react-icons/io5";
import { MdSelectAll } from "react-icons/md";
import { MdDeselect } from "react-icons/md";
import { useMediaContext } from "./MediaContext";
import { Media } from ".";
import { forceReRenderMedia } from "./MediaPanel";

export function CloseableActionPanel({onClose}: CloseablePanelProps) {

    const medias = useMediaContext().current as Media[];

    function allSelectAction(type: boolean) {
        medias.forEach(m => m.checked = type);
        forceReRenderMedia();
    }

    return <div class="flex flex-col bg-slate-900 border-4 border-slate-700 rounded-xl">
        <div class="ml-auto">
            <button class="rounded-md pt-2 pr-2" onClick={() => onClose()}>
                <IoClose size="24px"/>
            </button>
        </div>
        <div class="flex flex-col p-4 space-y-4">
            <button class="bg-slate-400 text-black font-medium p-2 rounded-xl" onClick={() => allSelectAction(true)}>
                <MdSelectAll size="24px"/>
                <span>Select All</span>
            </button>
            <button class="bg-slate-400 text-black font-medium p-2 rounded-xl" onClick={() => allSelectAction(false)}>
                <MdDeselect size="24px"/>
                <span>Deselect</span>
            </button>
        </div>
    </div>
}

export type CloseablePanelProps = {
    onClose(): void;
}