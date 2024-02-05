import { FC } from 'react'

interface OverviewProps {
  overview? : string
}

const Overview: FC<OverviewProps> = ({overview}) => {
  return <div>
    <h1 className='text-5xl'>Overview</h1>
    <p>{overview ?? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit error nisi veniam quam perferendis quaerat placeat dolor earum quae debitis?"}</p>
  </div>
}

export default Overview