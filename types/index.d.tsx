export interface MyAuthContext {
    signIn: (token:string) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}

export interface LoginFormType {
    email?: string;
    password?: string;
}

export interface SerieType {
    title: string;
    description: string;
    directors: string;
    release_year: string;
    rating: string;
    image?: any;
}

export interface DirectorType {
    full_name: string;
    email: string;
    series: string;
}