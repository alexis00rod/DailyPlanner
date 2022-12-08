export const Message = ({message,color}) => <p className={`px-2 py-2 text-${color}-500 font-semibold`}>{message.replace("auth/","Error: ")}</p>
