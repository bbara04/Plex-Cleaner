import { useState } from "preact/hooks"


export function ActionSelector() {
    const [open, setOpen] = useState(false);
    const actionPanel = <div class="bg-blue-950 p-2 rounded-md w-fit">
        <div class="flex">
            <button class="bg-slate-700 p-2 rounded-md ml-auto" onClick={() => setOpen(!open)}>X</button>
        </div>
        <div class="flex justify-evenly p-2 space-x-3">
            <button class="bg-slate-700 p-2 rounded-md">Select All</button>
            <button class="bg-slate-700 p-2 rounded-md">Select None</button>
        </div>
    </div>
    const closedPanel = <div class="bg-gray-300 text-black rounded-full w-12 h-12 flex items-center justify-center" onClick={() => setOpen(!open)}>
        <p>X</p>
    </div>
    return <>
        {open ? actionPanel : closedPanel}
    </>
}