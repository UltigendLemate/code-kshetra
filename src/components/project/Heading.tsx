import { FC } from 'react'
import { Activity } from 'lucide-react'
interface HeadingProps {
  text?  :string
}

const Heading: FC<HeadingProps> = ({text}) => {
  return <h2 className='text-3xl font-bold my-2'>
    <Activity className='inline mr-3 w-7 h-7' />
    {text ?? "Placeholder Here"}</h2>
}

export default Heading