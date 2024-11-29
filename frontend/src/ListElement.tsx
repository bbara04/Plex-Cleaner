
export function ListElement({ title, additionalInfo }: ListElementProps) {
    return <div class="flex items-center m-2 p-3 space-x-4 bg-slate-900 border-slate-700 border-4 rounded-md">
        <div class="flex-none w-8">
            <input class="w-5 h-5" type="checkbox" />
        </div>
        <span class="flex-1 min-w-40 overflow-ellipsis">{title}</span>
        <span class="flex-none w-fit">{additionalInfo}</span>
    </div>
}

export type ListElementProps = {
    title: string;
    additionalInfo: string;
}