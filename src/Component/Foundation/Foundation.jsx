import React from 'react'
import './Foundation.css'

import CAFoundationStudyMaterial from './CAFoundationStudyMaterial'
import CAFoundationQuestionBank from './CAFoundationQuestionBank'
import CAFoundationPYQ from './CAFoundationPYQ'

const Foundation = () => {
  return (
    <div id='ca foundation' className="grid-container">
    <h1> CA  Foundation</h1>
      <CAFoundationStudyMaterial />
      <CAFoundationQuestionBank />
      <CAFoundationPYQ />     
    </div>
  )
}

export default Foundation
