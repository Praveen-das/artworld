import react, { useRef, useState } from 'react'
import './dropdown.css'

function NavItem({ children }) {
    const [open, setOpen] = useState(false)
    const timer = useRef()
    const [menu, ...options] = children

    const mouseEnter = () => {
        clearTimeout(timer.current)
        setOpen(true)
    }
    
    const mouseLeave = () => {
        timer.current = setTimeout(() => {
            document.documentElement.style.setProperty("--top", 0);
            setOpen(false)
        }, 500)
    }

    return (
        <>
            <div className='dropdown-menu-wrapper' onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} >
                {menu}
                <div className="dropdown-menu">
                    {
                        open && options.map((element, index) => (
                            <div
                                className={`dropdown-menu-item`}
                                key={index}
                                onMouseEnter={() => {
                                    document.documentElement.style.setProperty('--top', index)
                                }}
                            >
                                {element}
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default NavItem
