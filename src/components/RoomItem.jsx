import { FaPen } from "react-icons/fa"

function RoomItem({room,handleEdit }) {
  return (
    <tr>
        <td>
            {
                room.roomNumber
            }
        </td>
        <td>
            {
                room.occupant=== ''?"----":room.occupant
            }
        </td>
        <td>
            {
                room.occupantNumber === ''?"----":room.occupantNumber
            }
        </td>
        <td>
            {
                room.available?'Yes':'No'
            }
        </td>
        <td>
            <FaPen className=" cursor-pointer" onClick={()=>handleEdit(room)}/>
        </td>
    </tr>
  )
}

export default RoomItem