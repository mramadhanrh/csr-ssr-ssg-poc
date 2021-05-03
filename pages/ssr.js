import React from "react";
import fetch from "isomorphic-unfetch";

const Home = ({ data }) => {
  return (
    <main>
      <h1>The Starwars films</h1>
      <ul>
        {data.map((item) => (
          <li key={item.title}>{item.title}</li>
        ))}
      </ul>
    </main>
  );
};

export async function getServerSideProps() {
  const response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();

  return { props: { data: data.results } };
}

export default Home;
