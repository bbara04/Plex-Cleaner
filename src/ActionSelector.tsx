import { useState } from "preact/hooks"

import { FaRegEdit } from "react-icons/fa";
import { CloseableActionPanel } from "./CloseablePanel";


export function ActionSelector() {
    const [open, setOpen] = useState(false);
    const closedPanel = <div class="bg-slate-800 p-3 rounded-full flex items-center justify-center" onClick={() => setOpen(!open)}>
        <FaRegEdit size="40px"/>
    </div>
    return <>
        {open ? <CloseableActionPanel onClose={() => setOpen(false)}/> : closedPanel}
    </>
}