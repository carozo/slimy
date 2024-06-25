import React, { PropsWithChildren } from 'react'
import { Backdrop } from './Backdrop'
import { Floor } from './Floor'

export const Scenery = ({ children }: PropsWithChildren) => (
  <Backdrop>
    {children}
    <Floor />
  </Backdrop>
)
