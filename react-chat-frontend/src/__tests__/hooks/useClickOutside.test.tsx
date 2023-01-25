import useClickOutside from '../../hooks/useClickOutside'
import { fireEvent, render, renderHook, screen } from '@testing-library/react'
import { createRef } from 'react'

describe('useClickOutside', () => {
  it('should not fire when clicked inside', () => {
    const handler = jest.fn()
    const ref = createRef<HTMLDivElement>()
    render(<div ref={ref} data-testid='test-id'></div>)

    renderHook(() => useClickOutside(ref, handler))

    fireEvent.mouseDown(screen.getByTestId('test-id'))

    expect(handler).not.toBeCalled()
  })

  it('should fire when clicked outside', () => {
    const handler = jest.fn()
    const ref = createRef<HTMLDivElement>()
    render(
      <div data-testid='test-id' style={{ width: '100vw', height: '100vh' }}>
        <div ref={ref} style={{ width: '100px' }}>
          test
        </div>
        <div>test2</div>
      </div>
    )


    renderHook(() => useClickOutside(ref, handler))

    fireEvent.mouseDown(screen.getByTestId('test-id'))

    expect(handler).toBeCalledTimes(1)
  })
})
