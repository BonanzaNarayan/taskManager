import './Toast.css'

function Toast(props) {
  return (
    <div className='toast'>{props.status}</div>
  )
}

export default Toast