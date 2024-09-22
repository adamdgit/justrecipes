'use client'

import { useEffect, useState } from "react"

type Props = {
  msg: string | null,
  needsUpdate: boolean
}

export default function ErrorMessage({ msg, needsUpdate } : Props) {
  const [shouldUpdate, setShouldUpdate] = useState(needsUpdate);

  // hide error message component after 2 seconds
  useEffect(() => {
    console.log("update")
    setTimeout(() => {
      setShouldUpdate(false)
    }, 3500)
  },[shouldUpdate])

  return (
    <div className="error-msg" style={shouldUpdate ? {opacity: "1"} : {opacity: "0"}}>
      <p>{msg ? msg : "Something went wrong."}</p>
    </div>
  )
}
