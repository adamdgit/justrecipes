type Props = {
  msg: string | null
}

export default function ErrorMessage({ msg } : Props) {
  return (
    <div className="error-msg">
      <p>{msg ? msg : "Something went wrong."}</p>
    </div>
  )
}
