// COMPONENTS
import { Box } from '@mui/material';

// TECHNICAL
import { keyframes } from '@emotion/react';


const fadeInRight = keyframes({ from: { opacity: 0, transform: 'translateX(-50px)'}, to: { opacity: 1, transform: 'translateX(0)'} })
const fadeInLeft = keyframes({ from: { opacity: 0, transform: 'translateX(50px)'}, to: { opacity: 1, transform: 'translateX(0)'} })

interface Props{
    children: React.ReactNode[] | React.ReactNode
    direction: 'left' | 'right'
}

const AnimateWrapper = ({children, direction}: Props) => {
  return( 
            <Box sx={{opacity: 0, animation: `${direction == 'left' ? fadeInLeft : fadeInRight} 0.4s ease  forwards`}}>     
                {children}
            </Box>
        )
};

export default AnimateWrapper;
