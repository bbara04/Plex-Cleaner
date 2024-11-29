import { hydrate, prerender as ssr } from 'preact-iso';
import { MainPage } from './MainPage';
import { NavBar } from './NavBar';

import './styles/tailwind.css';
import { useEffect, useState } from 'preact/hooks';
import { SettingsPanel } from './SettingsPanel';

export function App() {
    const [settingsOpen, setSettingsOpen] = useState(false);

    const [allMedia, setAllMedia] = useState([]);
    const [expiredMedia, setExpiredMedia] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState(() => { });

    useEffect(() => {
        fetch('http://localhost:5000/api/media/all')
            .then(response => response.json())
            .then(data => {
                setAllMedia(data);
            });
        fetch('http://localhost:5000/api/media/expired')
            .then(response => response.json())
            .then(data => {
                setExpiredMedia(data);
            });
    }, []);

    return (
        <div class="bg-slate-400">
            <div class="fixed left-0 top-0 w-full z-10">
                <NavBar openSettings={(value) => { setSettingsOpen(value) }}></NavBar>
            </div>
            {settingsOpen ? <SettingsPanel /> : <MainPage media={allMedia} />}
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
    size: string;
};
