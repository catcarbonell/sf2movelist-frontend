import Image from "next/image";

const Character = ({character}) => {
  return (
    <div className="div--card-character">
      <Image 
          src={`${process.env.NEXT_PUBLIC_PORT}${character.attributes.pic.data.attributes.url}`}
          alt={character.attributes.name} 
          className="character-image"
          width="100%"
          height="100%"
      />
      <div className="character-name">
        <h3>{character.attributes.name}</h3>
      </div>
    </div>
  )
  }
  
  export default Character;