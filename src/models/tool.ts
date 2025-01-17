import { Member } from "./member";

export interface Tool{

  id: number,
  nom: string,
  date: Date,
  source: string,
  createur?: Member

}
