export interface Game {
    id: string;
    name: string;
    slug: string;
    requirements: {
        low: number;
        med: number;
        high: number;
        ultra: number;
    };
}

export const games: Game[] = [
    {
        id: 'cyberpunk-2077',
        name: 'Cyberpunk 2077',
        slug: 'cyberpunk-2077',
        requirements: { low: 35, med: 55, high: 75, ultra: 95 }
    },
    {
        id: 'valorant',
        name: 'Valorant',
        slug: 'valorant',
        requirements: { low: 10, med: 20, high: 30, ultra: 40 }
    },
    {
        id: 'elden-ring',
        name: 'Elden Ring',
        slug: 'elden-ring',
        requirements: { low: 40, med: 60, high: 80, ultra: 90 }
    }
];