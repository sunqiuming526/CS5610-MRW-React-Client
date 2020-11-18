import React from "react";

const MyComment = ({user}) => {
  return (
    <div>
      <h5 className="mb-3">My Comments</h5>
      <div className="col-md-12">
        <table className="table table-sm table-hover table-striped">
          <tbody>
          <tr>
            <td>
              <strong>Comment 1</strong> example
            </td>
          </tr>
          <tr>
            <td>
              <strong>Comment 2</strong> example
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyComment
