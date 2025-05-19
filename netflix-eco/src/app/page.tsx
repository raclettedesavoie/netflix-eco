'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://localhost:7238/WeatherForecast")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du fetch");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="flex flex-direction-column items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-xl font-bold mb-4">Prévisions météo</h1>

      {error && <p className="text-red-500">Erreur : {error}</p>}

      <ul className="list-disc pl-5 space-y-2">
        {data.map((forecast, idx) => (
          <li key={idx}>
            {forecast.date} - {forecast.temperatureC}°C - {forecast.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}
