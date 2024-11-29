import { ActionSelector } from "./ActionSelector";
import { IconButton } from "./IconButton";
import { MdDeleteForever } from "react-icons/md";
import { Media } from ".";
import { MediaPanel } from "./MediaPanel";
import { WaitingPanel } from "./WaitingPanel";

export function MainPage({ media }: MainPageProps) {
    return (
        media.length > 0 ?
            <div class="m-4 mt-20 overflow-y-scroll" style="height: 85vh">
                <div class="">
                    <MediaPanel medias={media}></MediaPanel>
                </div>
                <div class="fixed bottom-4 right-4">
                    <ActionSelector />
                </div>
                <div class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-800 text-red-400 rounded-2xl px-3">
                    <IconButton Icon={MdDeleteForever} size="42px" onClick={() => { }} />
                </div>
            </div>
            :
            <div class="overflow-y-hidden h-screen">
                <WaitingPanel/>
            </div>
    );
}
export type MainPageProps = {
    media: Media[];
};