export type TTokenData = { time: number; value: number };

export const fetchTokenData = async () => {
  const encodedJson =
    "%7B%0D%0A+++%22json%22%3A%7B%0D%0A++++++%22tokens%22%3A%5B%0D%0A+++++++++%22ibc%2FC4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9%22%2C%0D%0A+++++++++%22untrn%22%0D%0A++++++%5D%2C%0D%0A++++++%22chainId%22%3A%22neutron-1%22%2C%0D%0A++++++%22dateRange%22%3A%22D7%22%0D%0A+++%7D%0D%0A%7D";
  const url = `https://app.astroport.fi/api/trpc/charts.prices?input=${encodedJson}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed to fetch data. Status: ${res.status}`);
  }

  const data = await res.json();

  const formatChartData = (atom: TTokenData[], ntrn: TTokenData[]) => {
    return atom.map((item, idx) => {
      const formattedTime = new Date(item.time * 1000).toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      });
      return {
        time: formattedTime,
        atom: item.value.toFixed(2),
        ntrn: ntrn[idx].value.toFixed(2),
      };
    });
  };

  const calculateAverage = (data: TTokenData[]) => {
    if (data.length === 0) {
      return "0";
    }

    const sum = data.reduce((acc, entry) => acc + entry.value, 0);
    const average = sum / data.length;

    return average.toFixed(2);
  };

  const atom: TTokenData[] =
    data.result.data.json[
      "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9"
    ].series;

  const ntrn: TTokenData[] = data.result.data.json.untrn.series;

  const atomMax = Math.max(...atom.map((item) => item.value));
  const atomMin = Math.min(...atom.map((item) => item.value));
  const atomAvg = calculateAverage(atom);
  const ntrnMax = Math.max(...ntrn.map((item) => item.value));
  const ntrnMin = Math.min(...ntrn.map((item) => item.value));
  const ntrnAvg = calculateAverage(ntrn);

  const chartData = formatChartData(atom, ntrn);

  return { chartData, atomMax, atomMin, ntrnMax, ntrnMin, atomAvg, ntrnAvg };
};
