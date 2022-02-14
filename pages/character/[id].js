import Link from 'next/link';
import Head from 'next/head'
import Image from 'next/image';

const fullCharacter = ({ character }) => {
  return (
    <>
    <Head>
        <title> {character.attributes.name} | Street Fighter II Move Lists</title>
    </Head>
    <div className="div--container">
      <div className="div--details">
        <h1>{character.attributes.name}</h1>
        <h3>Type: {character.attributes.type} </h3>
          <Image
              src={`${process.env.NEXT_PUBLIC_PORT}${character.attributes.pic.data.attributes.url}`}
              alt={character.attributes.name}
              height="200%"
              width="200%"
          />
          <h3>Special Moves</h3>
          <div>
            {character.attributes.moveset.map(
              (move) => (
                <p key={move.id}>{move.name} - {move.moveset}</p>
                )
            )}
          </div>
          <div>
            <h3>Ultra</h3>
            {character.attributes.ultra}
          </div>
          <br />
          <Link href="/" passHref>
            <button className="button--home">Home</button>
          </Link>
        </div>
      </div>
      </>
  );
};

export default fullCharacter;

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:1337/api/characters?populate=*`);
  const characters = await res.json();
  return {
    paths: characters.data.map((character) => ({
      params: {
        id: character.id.toString(),
      },
    })),
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://localhost:1337/api/characters/${params.id}?populate=*`
  );

  const character = await res.json();

  return {
    props: { character: character.data },
    revalidate: 1,
  };
}