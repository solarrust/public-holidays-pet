import React from 'react'
import Accordion from '../Accordion/Accordion'

export default function Results({ today }: { today: string }) {
  return <Accordion today={today} />
}
