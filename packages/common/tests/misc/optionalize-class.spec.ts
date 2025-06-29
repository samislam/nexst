import { OptionalizeClass } from '@/misc/optionalize-class'

describe('OptionalizeClass', () => {
  it('should make all properties of the base class optional', () => {
    class A {
      e: string
    }

    const _OptionalizedA = OptionalizeClass(A)

    // Assert that OptionalizedA has optional properties
    type OptionalizedAInstance = InstanceType<typeof _OptionalizedA>
    const instance: OptionalizedAInstance = {}
    instance.e = 'optional' // Optional assignment
    expect(instance.e).toBe('optional')
  })

  it('should work with a derived class and keep derived properties required', () => {
    class A {
      e: string
    }

    const OptionalizedA = OptionalizeClass(A)

    class _OptionalizedB extends OptionalizedA {
      c: string
    }

    // Assert that OptionalizedB has optional 'e' and required 'c'
    type OptionalizedBInstance = InstanceType<typeof _OptionalizedB>
    const instance: OptionalizedBInstance = { c: 'required' }
    expect(instance.c).toBe('required')
    expect(instance.e).toBeUndefined() // Optional property

    instance.e = 'optional'
    expect(instance.e).toBe('optional')
  })

  it('should not alter behavior for classes with no properties', () => {
    class Empty {}

    const _OptionalizedEmpty = OptionalizeClass(Empty)

    type OptionalizedEmptyInstance = InstanceType<typeof _OptionalizedEmpty>
    const instance: OptionalizedEmptyInstance = {}
    expect(instance).toBeDefined()
  })
})
