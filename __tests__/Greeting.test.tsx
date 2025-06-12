import { render, screen } from '@testing-library/react'
import Greeting from '@/components/Greeting'

describe('Greeting component', () => {
    it('renders the name passed as prop', () => {
        render(<Greeting name="Morado" />)
        expect(screen.getByText('Hello, Morado!')).toBeInTheDocument()
    })
})
