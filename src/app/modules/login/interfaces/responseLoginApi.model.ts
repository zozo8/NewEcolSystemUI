export interface ResponseLoginApi {
  id: number;
  userName: string;
  email: string;
  token: string;
  refreshToken: string;
  departmentsId?: number[];
  language: string;
  tokenExp: number;
  tokenUr: string;
}
