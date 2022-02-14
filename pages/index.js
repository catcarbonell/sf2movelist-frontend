import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Character from '../components/Character'
import SFIILogo from '../public/sfiilogo.png'

export default function Home({ characters }) {
  // eslint-disable-next-line react/display-name
  const CharacterClick = React.forwardRef(({ onClick, href, children }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref}>
        {children}
      </a>
    )
  })
  
  return (
    <div>
      <Head>
        <title>Street Fighter II Move Lists</title>
      </Head>
      <div className="div--container">
        <Image 
            src={SFIILogo}
            alt="Street Fighter 2 Logo"
        />
        <h1>Street Fighter II Move Lists</h1>
        <div className="div--container-characters">
          {characters.data.map((character) => 
              <Link 
                  href={`/character/${character.id}`} 
                  key={character.id} 
                  passHref
              >
                <CharacterClick>
                  <Character character={character} />
                </CharacterClick>
              </Link>
            )} 
          </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:1337/api/characters?populate=*');

  const characters = await res.json();
 
  return {
    props: {
      characters,
    },
  };
}