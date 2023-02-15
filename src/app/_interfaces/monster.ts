export interface IMonsterProfil {
    _id: string;
    name: string;
    role: string;
    race: string;
    avatar: string;
}

export interface IMonster extends IMonsterProfil {
    email: string;
    created_at: Date;
    updated_at: Date;
}