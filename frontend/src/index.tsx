import { hydrate, prerender as ssr } from 'preact-iso';
import { MainPage } from './MainPage';
import { NavBar } from './NavBar';

import './styles/tailwind.css';
import { useState } from 'preact/hooks';
import { SettingsPanel } from './SettingsPanel';


export function App() {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [selectedView, setSelectedView] = useState("all");

    return (
        <div class="bg-slate-400">
            <div class="fixed left-0 top-0 w-full z-10">
                <NavBar openSettings={(value) => { setSettingsOpen(value) }} selectMediaView={mediaView => setSelectedView(mediaView)}></NavBar>
            </div>
            {settingsOpen ? <SettingsPanel onClose={() => setSettingsOpen(false)}/> : <MainPage mediaPath={selectedView}></MainPage>}
        </div>
    );
}

if (typeof window !== 'undefined') {
    hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
    return await ssr(<App {...data} />);
}

export type Media = {
    title: string;
    last_watched: string;
    id: number;
    type: string;
    checked?: boolean;
};
