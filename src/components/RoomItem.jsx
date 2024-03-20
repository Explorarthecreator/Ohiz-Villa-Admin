
function RoomItem({room}) {
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
            {
                room.lodge
            }
        </td>
    </tr>
  )
}

export default RoomItem