import React from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

const Home = ({ title, time }) => {
  const router = useRouter();

  return (
    <main>
      <h1>The Starwars films</h1>
      <ul>
        <li key={title}>{title}</li>
        <li key={time.toString()}>{time}</li>
      </ul>
    </main>
  );
};

export async function getStaticProps({ params }) {
  const response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();
  console.log("Getting Static Props");

  return {
    props: {
      title: data.results[params.pid].title,
      time: new Date().getTime(),
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();
  const paths = data.results.map((_, i) => ({
    params: { pid: i.toString() },
  }));

  // Set to false for exporting
  return { paths, fallback: false };
}

export default Home;
