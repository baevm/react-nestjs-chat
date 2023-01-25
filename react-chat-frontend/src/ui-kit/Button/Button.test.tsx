import { Button } from './Button'
import { render, screen } from '@testing-library/react'

describe('Button', () => {
  it('Passes type to button component', () => {
    render(<Button type='submit'>Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('Renders icon', () => {
    render(<Button icon='add'>Submit</Button>)
    expect(screen.getByText('add')).toBeInTheDocument()
  })

  it('Renders loading spinner and disables button', () => {
    render(<Button isLoading={true}>Submit</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('data-loading')
    expect(button).toBeDisabled()
  })
})
