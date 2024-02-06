import { FC } from 'react'

interface DescriptionProps {
  text?  :string
}

const Description: FC<DescriptionProps> = ({text}) => {
    const placeholder = "AI has synthesized a business plan from your idea, scroll below and check out the results!"
  return <p className='text-md '>{text ?? placeholder}</p>
}

export default Description