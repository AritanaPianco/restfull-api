
export interface IHashProvider {
      generateHash(payload: string, quantity: number): Promise<string>;
      compareHash(payload: string, hashed: string): Promise<boolean>;

}
