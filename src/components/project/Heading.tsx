import { FC , useRef, useEffect} from 'react'
import { Activity } from 'lucide-react'
interface HeadingProps {
  text?  :string
  setActive: (text: string) => void
}

const Heading: FC<HeadingProps> = ({text, setActive}) => {
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
    <Activity className='inline mr-3 w-7 h-7' />
    {text ?? "Placeholder Here"}</h2>
}

export default Heading