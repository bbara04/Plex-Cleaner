
export function NavBar({openSettings}: NavBarProps) {
    return <nav class="flex justify-between p-4 bg-green-300 text-black font-normal font-bold">
        <a class="flex-initial w-24" href="#" onClick={() => openSettings(false)}>Home</a>
        <a class="flex-initial w-24" href="#">All</a>
        <a class="flex-initial w-24" href="#">Expired</a>
        <a class="ml-auto" href="#" onClick={() => openSettings(true)}>Settings</a>
    </nav>
}

export type NavBarProps = {
    openSettings: (isOpen: boolean)=>void;
};