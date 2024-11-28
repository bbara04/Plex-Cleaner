import { ActionSelector } from "./ActionSelector";
import { IconButton } from "./IconButton";
import { MediaPanel } from "./MediaPanel";
import { MdDeleteForever } from "react-icons/md";


export function MainPage() {
    return <div class="m-4 overflow-y-scroll" style="height: 85vh">
        <div class="">
            <MediaPanel></MediaPanel>
        </div>
        <div class="fixed bottom-4 right-4">
            <ActionSelector></ActionSelector>
        </div>
        <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800 text-red-400 rounded-2xl px-3">
            <IconButton Icon={MdDeleteForever} size="42px" onClick={() => { }} />
        </div>
    </div>
}