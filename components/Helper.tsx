'use client'

import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react"

export default function Helper() {

  const [showModal, setShowModal] = useState(true);
  const helperModal = useRef<HTMLDivElement>(null);
  const steps = useRef<HTMLOListElement>(null);
  const images = useRef<HTMLDivElement>(null);
  const caret = useRef<HTMLButtonElement>(null);

  function hideHelperModal() {
    setShowModal(!showModal)
    if (helperModal.current && steps.current && images.current && caret.current) {
      if (showModal) {
        helperModal.current.style.height = '30px';
        helperModal.current.style.padding = 'unset';
        steps.current.style.display = 'none';
        images.current.style.display = 'none';
        caret.current.style.transform = 'rotate(0deg)';
      } else {
        helperModal.current.style.height = '';
        helperModal.current.style.padding = '';
        steps.current.style.display = '';
        images.current.style.display = '';
        caret.current.style.transform = '';
      }
    }
  }

  return (
    <div className="helper-wrap" ref={helperModal}>
      <button onClick={() => hideHelperModal()} className="hide-helper-btn" ref={caret}>
        <FontAwesomeIcon icon={faCaretDown} width={20} height={20} />
      </button>
      <ol className="generate-steps" ref={steps}>
        <li>Click "share" on your Youtube video</li>
        <li>Copy the video URL</li>
        <li>Paste the URL in the box below</li>
        <li>Click Generate</li>
      </ol>
      <div className="generate-steps-imgs" ref={images}>
        <img src="/images/pic1.png" alt="instruction image helper 1" />
        <img src="/images/pic2.png" alt="instruction image helper 2" />
      </div>
    </div>
  )
}
