import bg from './assets/waiting-bg-mountain.jpg';

export function WaitingPanel() {
    return <div class="flex justify-center items-center h-screen overflow-hidden">
        <img src={bg} class="object-cover h-full w-full opacity-70 blur-sm" alt="waiting" />
        <div class="fixed bg-slate-700 p-4 rounded-lg opacity-80">
            <span class="text-3xl font-bold opacity-100">It could be faster...</span>
        </div>
    </div>
}