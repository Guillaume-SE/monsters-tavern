export interface IMonsterProfil {
    _id: string;
    name: string;
    role: string;
    race: string;
    avatar: string;
}

export interface IMonster extends IMonsterProfil {
    email: string;
    created_at?: Date | null;
    updated_at?: Date | null;
}

export interface INewMonster {
    name: string;
    email: string;
    password: string;
    role: string;
    race: string;
    avatar: string;
}