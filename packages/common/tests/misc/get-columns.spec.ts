import { AnyClass } from '@/index'
import { Repository } from 'typeorm'
import { getColumns } from '@/misc/get-columns'

describe('getColumns() utility function', () => {
  it('should return columns metadata and names without filtering', () => {
    const mockColumns = [
      { propertyName: 'id', isSelect: true },
      { propertyName: 'name', isSelect: true },
    ]
    const mockRepo = {
      metadata: {
        columns: mockColumns,
      },
    } as unknown as Repository<AnyClass> // Cast to match the type

    const result = getColumns(mockRepo)

    expect(result.columns).toEqual(mockColumns)
    expect(result.names).toEqual(['id', 'name'])
  })

  it('should return columns metadata and names with filtering', () => {
    const mockColumns = [
      { propertyName: 'id', isSelect: true },
      { propertyName: 'name', isSelect: false },
    ]
    const mockRepo = {
      metadata: {
        columns: mockColumns,
      },
    } as unknown as Repository<AnyClass> // Cast to match the type

    const result = getColumns(mockRepo, true)

    expect(result.columns).toEqual([{ propertyName: 'id', isSelect: true }])
    expect(result.names).toEqual(['id'])
  })

  it('should return empty columns and names if no columns are selectable and `excludeNotSelected` is true', () => {
    const mockColumns = [
      { propertyName: 'id', isSelect: false },
      { propertyName: 'name', isSelect: false },
    ]
    const mockRepo = {
      metadata: {
        columns: mockColumns,
      },
    } as unknown as Repository<AnyClass> // Cast to match the type

    const result = getColumns(mockRepo, true)

    expect(result.columns).toEqual([])
    expect(result.names).toEqual([])
  })
})
