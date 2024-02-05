import { FC } from 'react'

interface OverviewProps {
  overview? : string
}

const Overview: FC<OverviewProps> = ({overview}) => {
  return <div>
    <h1 className='text-5xl'>Overview</h1>
    <p>{overview ?? "AI has synthesized a business plan from your idea, scroll below and check out the results!"}</p>
  </div>
}

export default Overview