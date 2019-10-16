interface IHashService{
    GeneratedToken(): string;

    Encrypt(line: string): string

    Equals(passwordSave: string, password: string): boolean;
}