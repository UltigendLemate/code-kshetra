import { FC , useRef, useEffect} from 'react'
import { Activity } from 'lucide-react'
interface HeadingProps {
  text?  :string
  icon ? : React.ReactNode
  setActive: React.Dispatch<React.SetStateAction<string>>
}

const Heading: FC<HeadingProps> = ({text, setActive, icon}) => {
  const headingRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(text);
          setActive(text!);
        }
      });
    }, {
      root: null, 
      rootMargin: '0px',
      threshold: 0.5 
    });

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, [text]);


  return <h2 
  ref={headingRef}
  className='text-3xl font-bold my-2'>
    <div className='iconProj inline '>
    {icon ??  <Activity  />}
    </div>
    {text ?? "Placeholder Here"}</h2>
}

export default Heading