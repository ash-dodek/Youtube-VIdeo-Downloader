import React from 'react'
import '../CSS/button.css'

function Button(props) {
  return (
    <div className='button'>
        <button className={props.className} style={{backgroundColor:props.bgColor, color:props.color}}>
            <span className="withIcon material-symbols-outlined">{props.icon}</span>
            {props.text}
        </button>
    </div>
  )
}

export default Button