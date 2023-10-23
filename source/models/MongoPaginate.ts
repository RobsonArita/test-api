import { Aggregate } from 'mongoose'

export type IAggregatePaginate<T> = (
  aggregate: Aggregate<Array<any>>,
  options?: Record<string, any>,
  callback?: (err: any, result: IPaginateResult<T>) => void
) => Promise<IPaginateResult<T>>

export interface IPaginateResult<T> {
  docs: Array<T>
  totalDocs: number
  limit: number
  page: number
  totalPages: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  offset: number
  prevPage: any
  nextPage: any
}