import bg from './assets/waiting-bg-mountain.jpg';

export function WaitingPanel({message, color="#0f172a"}: WaitingPanelProps) {
    return <div class="flex justify-center items-center h-screen overflow-hidden">
        <img src={bg} class="object-cover h-full w-full opacity-70 blur-sm" alt="waiting"/>
        <div class="fixed p-4 rounded-lg opacity-80" style={`background-color: ${color}`}>
            <span class="text-3xl font-bold opacity-100">{message}</span>
        </div>
    </div>
}

export type WaitingPanelProps = {
    message: string;
    color?: string;
};