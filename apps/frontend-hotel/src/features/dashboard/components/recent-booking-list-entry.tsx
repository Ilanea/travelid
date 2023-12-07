import React from 'react'

function () {
  return (
    <div className="flex space-x-4 justify-between bg-white p-4 rounded-xl">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={
                'https://images.unsplash.com/photo-1612837017953-4b6b7b0b2b0b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va2luZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80'
              }
            />
            <AvatarFallback>{'MF' ? 'MF' : <Icons.user />}</AvatarFallback>
          </Avatar>
          <div className="flex-col flex-1">
            <div className="flex justify-between">
              <div>Matthias Falbesoner</div>
              <div>Business</div>
            </div>
            <div className="flex justify-between">
              <div>20.11.2023 - 26.11.2023</div>
              <div>6 Days</div>
            </div>
          </div>
        </div>
  )
}

export default recent-booking-list-entry