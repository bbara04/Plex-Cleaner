
export function ListElement({title, additionalInfo}: ListElementProps) {
    return <div class="flex justify-between m-2 p-3 space-x-8 border-blue-400 border-2 rounded-md">
        <input class="flex-initial sm:w-5 lg:w-12" type="checkbox"/>
        <span class="flex-1 overflow-hidden">{title}</span>
        <span class="flex-initial lg:w-48 sm:w-24">{additionalInfo}</span>
    </div>
}

export type ListElementProps = {
    title: string;
    additionalInfo: string;
}