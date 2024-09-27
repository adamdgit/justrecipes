import Loading from "@/components/Loading";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('Loading', () => {
  it("renders a loading component with custom string argument", () => {
    const { getByText, container } = render(<Loading message="testing" />)
    expect(container.firstChild).toHaveClass('loading');
    
    expect(getByText("testing")).toBeInTheDocument();
  })
})