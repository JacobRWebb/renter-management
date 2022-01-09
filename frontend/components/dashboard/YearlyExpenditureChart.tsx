import { Chart, registerables } from "chart.js";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../util/constants";

const YearlyExpenditureChart: FunctionComponent = () => {
  const yearlyChartRef = useRef<HTMLCanvasElement>(null);
  const yearlyChartParentRef = useRef<HTMLDivElement>(null);

  const [yearlyChart, setYearlyChart] = useState<Chart | null>(null);
  const [yearlyChartData, setYearlyChartData] = useState<number[]>([]);
  const [yearlyChartLabels, setYearlyChartLabels] = useState<string[]>([]);

  useEffect(() => {
    Chart.register(...registerables);
    axiosInstance
      .post("stripe/getInvoices")
      .then((res) => {})
      .catch((error) => {});

    if (yearlyChart !== null) {
      yearlyChart.data.datasets[0].data = yearlyChartData;
      yearlyChart.data.labels = yearlyChartLabels;
      yearlyChart.update();
    } else {
      if (yearlyChartRef.current && yearlyChartParentRef.current) {
        let tempChart = new Chart(yearlyChartRef.current, {
          type: "line",
          options: {
            responsive: false,
            maintainAspectRatio: false,
          },
          data: {
            labels: [],
            datasets: [
              {
                label: "Yearly Expenditure",
                data: [],
              },
            ],
          },
        });

        setYearlyChart(tempChart);
      }
    }

    return () => {
      Chart.unregister(...registerables);
    };
  });

  useEffect(() => {
    let resize = () => {};
    let interval: NodeJS.Timer | null = null;
    if (yearlyChart) {
      resize = () => {
        if (yearlyChartParentRef.current) {
          yearlyChart.resize(
            yearlyChartParentRef.current.getBoundingClientRect().width,
            yearlyChartParentRef.current.getBoundingClientRect().height
          );
        }
      };
      interval = setInterval(() => {
        resize();
      }, 100);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [yearlyChart]);

  return (
    <div className="flex flex-col rounded-lg bg-white p-4">
      {/* <h1 className="text-xl font-medium">Yearly Expenditure</h1> */}
      <div ref={yearlyChartParentRef} className="relative flex flex-col h-52">
        <div
          className={`absolute flex items-center justify-center top-0 w-full h-full bg-white opacity-50 ${
            yearlyChartData.length > 0 ? "hidden" : "flex"
          }`}
        >
          <h1 className="text-xl font-medium text-center">
            Looks like there is no data yet. Come back later!
          </h1>
        </div>
        <canvas ref={yearlyChartRef}></canvas>
      </div>
      {/* <button
        onClick={() => {
          let tempData = [...yearlyChartData];
          tempData.push(Math.floor(Math.random() * 100));
          setYearlyChartData(tempData);
          let tempLabels = [...yearlyChartLabels];
          tempLabels.push(`${tempLabels.length + 1}`);
          setYearlyChartLabels(tempLabels);
        }}
        className="bg-blue-800 text-white w-fit mx-auto rounded p-1 mt-4"
      >
        Add Fake Data Test
      </button> */}
    </div>
  );
};

export default YearlyExpenditureChart;
