import React from "react";
import Link from "next/link";

export default ({ data }) => {
  return (
    <main>
      <h1>An example of using Normal rendering vs SSR vs SSG on NextJS</h1>
      <p>Here we're building the same example, with 3 different approaches</p>
      <ul>
        <li>
          <Link href="/csr">
            <a>Client-side rendering example</a>
          </Link>
        </li>
        <li>
          <Link href="/ssr">
            <a>Server-side rendering example</a>
          </Link>
        </li>
        <li>
          <a>Static-generated site example</a>
          <ul>
            {data.map((_, i) => {
              return (
                <li key={i.toString()}>
                  <Link href={`/ssg/${i}`}>
                    <a>SSG page {i}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </main>
  );
};

export async function getServerSideProps() {
  const response = await fetch("https://swapi.dev/api/films/");
  const data = await response.json();

  return { props: { data: data.results } };
}
