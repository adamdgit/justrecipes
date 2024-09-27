import AuthButton from "@/components/AuthButton";
import { User } from "@supabase/supabase-js";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

describe('AuthButton', () => {

  // mock user data
  const mockUser: User = {
    id: "12345",
    app_metadata: {
      roles: ["user"], 
    },
    user_metadata: {
      firstName: "John",
      lastName: "Doe",
    },
    aud: "authenticated",
    confirmation_sent_at: "2024-09-01T12:34:56Z",
    recovery_sent_at: "2024-09-02T12:34:56Z",
    email_change_sent_at: "2024-09-03T12:34:56Z",
    new_email: "newemail@example.com",
    new_phone: "+1234567890",
    invited_at: "2024-09-01T12:34:56Z",
    action_link: "https://example.com/action", 
    email: "johndoe@example.com",
    phone: "+1987654321",
    created_at: "2024-08-30T12:34:56Z", 
    confirmed_at: "2024-09-01T12:34:56Z",
    email_confirmed_at: "2024-09-01T12:34:56Z",
    phone_confirmed_at: "2024-09-01T12:34:56Z",
    last_sign_in_at: "2024-09-25T12:34:56Z",
    role: "user",
    updated_at: "2024-09-25T12:34:56Z",
    identities: [],
    is_anonymous: false, 
    factors: [],
  };

  it("Renders authorised user components when logged in", () => {
    const { container } = render(<AuthButton user={mockUser}/>)
    expect(container.firstChild).toHaveClass('user-nav-wrap');
  })

  it("Renders default component when not logged in", () => {
    const { container } = render(<AuthButton user={null}/>)
    expect(container.firstChild).toHaveClass('btn login');
  })
})