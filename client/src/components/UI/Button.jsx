import React from "react";

function Button(texto, action) {
  return (
    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
      <span className="sr-only">Open main menu</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </Popover.Button>
  );
}

export default Button;
