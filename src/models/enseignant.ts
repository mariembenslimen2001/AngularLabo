import { Member } from "./member";


export interface Enseignant extends Member
{

  grade: string,
  etablissement: string

}
