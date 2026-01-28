import React from 'react'
import Link from "next/link";
import Image from "next/image";

function NavBar() {
    return (
        <header>
           <nav>
               <Link href='/' className='logo'>
                   <Image src = '/icons/logo.png' alt='Dev Events Logo' width={24} height={24} />

                   <p>Dev Event</p>
               </Link>

               <ul>
                   <Link href='/' className='Home'></Link>
                   <Link href='/events' className='Events'></Link>
                   <Link href='/create' className='Create'></Link>
               </ul>
           </nav>
        </header>
    )
}

export default NavBar
