import React from 'react'
const RevealOnScroll = ({ children }) => { 
    const [isVisible, setIsVisible] = React.useState(false); 
    const ref = React.useRef(null); 
  
    React.useEffect(() => { 
        const scrollObserver = new IntersectionObserver(([entry]) => { 
            if (entry.isIntersecting) { 
                setIsVisible(true); 
                scrollObserver.unobserve(entry.target); 
            } 
        }); 
  
        scrollObserver.observe(ref.current); 
  
        return () => { 
            if (ref.current) { 
                scrollObserver.unobserve(ref.current); 
            } 
        }; 
    }, []); 
  
    const classes = `transition-opacity duration-1000
        ${isVisible ? "opacity-100" : "opacity-0"
        }`; 
  
    return ( 
        <div ref={ref} className={classes}> 
            {children} 
        </div> 
    ); 
}; 
export default RevealOnScroll