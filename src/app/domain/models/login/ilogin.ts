export interface IRequestLogin {
  userName: string,
  password: string
}

export interface IResponseLogin {
  infoUsuario: any,
  token: string,
  mensaje: string
}
