import Chart from "./components/Chart";
import { fetchTokenData } from "./api/routes";
import MinMax from "./components/MinMax";

export default async function Home() {
  const { chartData, atomMax, atomMin, ntrnMax, ntrnMin, atomAvg, ntrnAvg } =
    await fetchTokenData();

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-4 font-mono text-xs sm:text-sm md:text-lg">
      <h2>{"7-day price chart of the $ATOM-$NTRN pair"}</h2>

      <div className="flex flex-row gap-20 items-center justify-center">
        <MinMax
          token={"ATOM"}
          max={atomMax}
          min={atomMin}
          avg={atomAvg}
          src={"/cosmos-atom-logo.svg"}
        />
        <MinMax
          token={"NTRN"}
          max={ntrnMax}
          min={ntrnMin}
          avg={ntrnAvg}
          src={"/ntrn.png"}
        />
      </div>

      <Chart chartData={chartData} />
    </main>
  );
}
