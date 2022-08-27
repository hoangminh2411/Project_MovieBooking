import React, { useEffect, useState } from 'react'

export default function ScrollToTop() {
    const [scrollTop, setScrollTop] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            setScrollTop(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)

        // clean up function
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleScrolltoTop = () => {
        window.scrollTo({ top: 0 });
    }

    if (!scrollTop) {
        return '';
    }

    else {

        return (

            <div onClick={handleScrolltoTop} className="fixed right-0 bottom-10 cursor-pointer z-50 ">

                <img className="w-14 h-14 rotate-180 " src="https://movie-booking-project.vercel.app/img/logoTixLoading.png" alt="totop" />

            </div>

        )
    }
}
