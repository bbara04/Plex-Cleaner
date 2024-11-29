import { IoClose } from "react-icons/io5";
import { MdSelectAll } from "react-icons/md";
import { MdDeselect } from "react-icons/md";

export function CloseableActionPanel({onClose}: CloseablePanelProps) {
    return <div class="flex flex-col bg-slate-900 border-4 border-slate-700 rounded-xl">
        <div class="ml-auto">
            <button class="rounded-md pt-2 pr-2" onClick={() => onClose()}>
                <IoClose size="24px"/>
            </button>
        </div>
        <div class="flex flex-col p-4 space-y-4">
            <button class="bg-slate-400 text-black font-medium p-2 rounded-xl">
                <MdSelectAll size="24px"/>
                <span>Select All</span>
            </button>
            <button class="bg-slate-400 text-black font-medium p-2 rounded-xl">
                <MdDeselect size="24px"/>
                <span>Deselect</span>
            </button>
        </div>
    </div>
}

export type CloseablePanelProps = {
    onClose(): void;
}