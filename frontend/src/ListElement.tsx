export function ListElement({ title, additionalInfo, checked, onClick}: ListElementProps) {

    return <div class="flex items-center m-2 p-3 space-x-4 bg-slate-900 border-slate-700 border-4 rounded-md" onClick={() => onClick()}>
        <div class="flex-none w-8">
            <input class="w-5 h-5" type="checkbox" checked={checked}/>
        </div>
        <span class="flex-1 min-w-40 overflow-ellipsis">{title}</span>
        <span class="flex-none w-fit">{additionalInfo}</span>
    </div>
}

export type ListElementProps = {
    title: string;
    additionalInfo: string;
    checked: boolean;
    onClick: () => void;
}