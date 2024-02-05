import { FC } from 'react'

interface DescriptionProps {
  text?  :string
}

const Description: FC<DescriptionProps> = ({text}) => {
    const placeholder = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi ad error dolorem quia accusantium culpa hic atque? Quos, laboriosam eaque ex quae atque accusamus harum aspernatur placeat quo facilis unde ullam voluptatum recusandae dolore ratione porro totam non quia eligendi cupiditate. Dolor distinctio incidunt ab, reprehenderit iusto exercitationem dignissimos a, odio beatae fuga quibusdam explicabo quod, ullam omnis porro sit."
  return <p className='text-md '>{text ?? placeholder}</p>
}

export default Description