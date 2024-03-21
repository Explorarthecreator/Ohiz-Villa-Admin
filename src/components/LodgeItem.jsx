

function LodgeItem({lodge}) {
  return (
    <tr>
        <td>
            {
                lodge.name
            }
        </td>
        <td>
            {
                lodge.webName
            }
        </td>
        <td>
            {
                lodge.numberOfRooms
            }
        </td>
    </tr>
  )
}

export default LodgeItem