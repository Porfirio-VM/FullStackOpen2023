
const Notification = ({message, type}) => {
    
    const classHandler = type === 'success'? 'success' : 'error'

    if(message === null) return null

    return <div className={classHandler}>{message}</div>
}

export default Notification