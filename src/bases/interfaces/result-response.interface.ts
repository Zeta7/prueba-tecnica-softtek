export interface IResultResponse {
  status: number
  data: void
  context: string
  getObject(): object
  getStatus(): number
  getData(): object
}
