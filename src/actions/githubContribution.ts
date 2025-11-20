export async function getContributionGraph(username: string) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}`
  );

  return res.json();
}
