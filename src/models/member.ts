import { Enseignant } from "./enseignant"
import { Evenement } from "./event"
import { Publication } from "./publication"
import { Tool } from "./tool"

export interface Member
{
  id:number,
  cin:string,
  nom:string,
  prenom:string,
  cv:string,
  // email:string,
  // password:string,
  dateNaissance:Date,
  role:string,
  sujet?: string,
  diplome?: string,
  dateInscription?: Date,
  encadrant?: Enseignant,
  grade?: string,
  etablissement?: string
  pubs : Publication[],
  outils : Tool[],
  events : Evenement[]


}
