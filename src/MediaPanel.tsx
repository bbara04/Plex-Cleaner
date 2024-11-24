import { ListElement } from "./ListElement";

export function MediaPanel() {
    const exampleMedias = [
        { title: 'Dragon Ball', additionalInfo: '50Gb | 20 days ago' },
        { title: 'One Piece', additionalInfo: '30Gb | 10 days ago' },
        { title: 'Naruto', additionalInfo: '40Gb | 15 days ago' },
        { title: 'Attack on Titan', additionalInfo: '35Gb | 5 days ago' },
        { title: 'My Hero Academia', additionalInfo: '25Gb | 12 days ago' },
        { title: 'Demon Slayer', additionalInfo: '45Gb | 8 days ago' },
        { title: 'Fullmetal Alchemist', additionalInfo: '55Gb | 30 days ago' },
        { title: 'Death Note', additionalInfo: '20Gb | 25 days ago' },
        { title: 'Sword Art Online', additionalInfo: '28Gb | 18 days ago' },
        { title: 'Tokyo Ghoul', additionalInfo: '38Gb | 22 days ago' },
        { title: 'One Punch Man', additionalInfo: '27Gb | 14 days ago' },
        { title: 'Fairy Tail', additionalInfo: '33Gb | 28 days ago' },
        { title: 'Bleach', additionalInfo: '48Gb | 35 days ago' },
        { title: 'Hunter x Hunter', additionalInfo: '42Gb | 17 days ago' },
        { title: 'Mob Psycho 100', additionalInfo: '29Gb | 11 days ago' },
        { title: 'JoJo\'s Bizarre Adventure', additionalInfo: '36Gb | 19 days ago' },
        { title: 'The Promised Neverland', additionalInfo: '31Gb | 13 days ago' },
        { title: 'Re:Zero', additionalInfo: '39Gb | 9 days ago' },
        { title: 'Your Lie in April', additionalInfo: '26Gb | 23 days ago' },
        { title: 'Code Geass', additionalInfo: '53Gb | 27 days ago' },
        { title: 'Steins;Gate', additionalInfo: '34Gb | 21 days ago' },
        { title: 'Fate/Zero', additionalInfo: '49Gb | 29 days ago' },
        { title: 'Gintama', additionalInfo: '41Gb | 16 days ago' },
        { title: 'Black Clover', additionalInfo: '32Gb | 24 days ago' },
        { title: 'Toradora!', additionalInfo: '22Gb | 26 days ago' },
        { title: 'Spirited Away', additionalInfo: '60Gb | 33 days ago' },
        { title: 'Howl\'s Moving Castle', additionalInfo: '65Gb | 31 days ago' },
    ];

    return (
        <>
            {exampleMedias.map(media => (
                <ListElement 
                    key={media.title} 
                    title={media.title} 
                    additionalInfo={media.additionalInfo} 
                />
            ))}
        </>
    );
}