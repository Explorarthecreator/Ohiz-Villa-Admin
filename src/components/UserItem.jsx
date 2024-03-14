

function UserItem({user}) {
  return (
    <tr>
        <td>
            {
                user.name
            }
        </td>
        <td>
            {
                user.duty
            }
        </td>
        <td>
            {
                user.email
            }
        </td>
    </tr>
  )
}

export default UserItem