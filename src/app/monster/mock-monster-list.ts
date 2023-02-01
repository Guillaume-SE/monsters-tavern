import { Monster } from './monster';

export const MONSTERS: Monster[] = [
    {
        id: "1",
        name: "Avator",
        email: "avator@avator.fr",
        role: "Soigneur",
        race: "Démon",
        avatar: "../assets/avatar/monster.png",
        created_at: new Date()
    },
    {
        id: "2",
        name: "Blurg",
        email: "blurg@blurg.fr",
        role: "Sorcier",
        race: "Vampire",
        avatar: "../assets/avatar/monster.png",
        created_at: new Date()
    },
    {
        id: "3",
        name: "Dragh, le sanguinaire",
        email: "dragh@dragh.fr",
        role: "Guerrier",
        race: "Orc",
        avatar: "../assets/avatar/monster.png",
        created_at: new Date()
    }
];