import { hydrate, prerender as ssr } from 'preact-iso';
import { MainPage } from './MainPage';
import { NavBar } from './NavBar';

import './styles/tailwind.css';
import { useState } from 'preact/hooks';
import { SettingsPanel } from './SettingsPanel';

export function App() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	return (
		<div class="bg-slate-400">
			<NavBar openSettings={(value) => {setSettingsOpen(value)}}></NavBar>
			{settingsOpen ? <SettingsPanel/> : <MainPage/>}
		</div>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
