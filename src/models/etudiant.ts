import { Enseignant } from "./enseignant";
import { Member } from "./member";

export interface Etudiant extends Member
{
  sujet: string,
  diplome: string,
  dateInscription: Date,
  encadrant: Enseignant
}
