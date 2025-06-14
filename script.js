async function fetchOdds() {
  const target = parseFloat(document.getElementById("targetOdds").value);
  if (isNaN(target)) return alert("Enter valid odds.");

  const apiKey = 'YOUR_API_KEY'; // Replace with your real key from theoddsapi.com
  const region = 'uk'; // e.g., uk, eu, us
  const markets = 'h2h'; // head-to-head (match winner)

  const res = await fetch(`https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=${apiKey}&regions=${region}&markets=${markets}&oddsFormat=decimal`);
  const data = await res.json();

  let html = '';
  data.forEach(event => {
    event.bookmakers.forEach(bookmaker => {
      bookmaker.markets.forEach(market => {
        market.outcomes.forEach(outcome => {
          const odds = parseFloat(outcome.price);
          if (Math.abs(odds - target) <= 0.05) {
            html += `<div><strong>${event.home_team} vs ${event.away_team}</strong><br>
              ${outcome.name} at <strong>${odds}</strong> (${bookmaker.title})</div><hr>`;
          }
        });
      });
    });
  });

  document.getElementById("results").innerHTML = html || "<p>No close matches found.</p>";
}
