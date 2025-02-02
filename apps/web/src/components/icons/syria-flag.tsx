import React from 'react'

/** More flags from https://nucleoapp.com/svg-flag-icons */
export const SyriaFlag = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" {...props}>
      <path fill="#fff" d="M1 11H31V21H1z"></path>
      <path d="M5,4H27c2.208,0,4,1.792,4,4v4H1V8c0-2.208,1.792-4,4-4Z" fill="#be2a2c"></path>
      <path
        d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z"
        transform="rotate(180 16 24)"
      ></path>
      <path
        d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
        opacity=".15"
      ></path>
      <path
        d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
        fill="#fff"
        opacity=".2"
      ></path>
      <path
        fill="#357942"
        d="M11.395 16.551L13.36 15.123 10.931 15.123 10.18 12.812 9.429 15.123 7 15.123 8.965 16.551 8.215 18.861 10.18 17.433 12.146 18.861 11.395 16.551z"
      ></path>
      <path
        fill="#357942"
        d="M20.605 16.551L18.64 15.123 21.069 15.123 21.82 12.813 22.571 15.123 25 15.123 23.035 16.551 23.785 18.861 21.82 17.433 19.854 18.861 20.605 16.551z"
      ></path>
    </svg>
  )
}
