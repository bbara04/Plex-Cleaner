import { ActionSelector } from "./ActionSelector";
import { MediaPanel } from "./MediaPanel";


export function MainPage() {
    return <div class="m-4">
        <div class="">
            <MediaPanel></MediaPanel>
        </div>
        <div class="fixed bottom-4 right-4">
            <ActionSelector></ActionSelector>
        </div>
    </div>
}