

function LodgeItem({lodge,numberOfRooms}) {
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
                numberOfRooms
            }
        </td>
    </tr>
  )
}

export default LodgeItem