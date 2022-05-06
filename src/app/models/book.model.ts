export interface IBook {
  uuid: string,
  title: string,
  description: string,
  totalChapter: number
}




let IBook3: Pick<IBook, 'uuid' | 'title' | 'description'> = {
  title: "hiro le coq",
  description: 'je suis juste un garcon comme tout les autres',
  uuid: ''
}
export interface IBook2 extends Partial<IBook> {

}

let book: IBook2 = {

}

export interface IBook4 extends Pick<IBook, 'uuid' | 'title' | 'description'> {

}

let book5: IBook4 = {
  description: "",
  title: "",
  uuid: ""
}
