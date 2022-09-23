import React from "react";

function PopOverCart({ user }) {
  return (
    <>
      {user.tickets.map((ticket) => {
        return <p>{ticket.name} </p>;
      })}

      <button>GO TO CHEACKOUT</button>
    </>
  );
}

export default PopOverCart;
