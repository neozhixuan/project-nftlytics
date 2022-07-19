import { Card } from "./Card";
import { SectorCard } from "./SectorCard";
import { StockAnalysisCard } from "./StockAnalysisCard";
import { Accordion } from "./Accordion";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";


export const StockEvaluator = (props) => {
  const [index, setIndex] = useState(0);

  const nextStock = () => {
    if (index !== props.allItems.length - 1) {
      setIndex(index + 1);
    }
  };
  const isMobileMode = useMediaQuery({
    query: "(min-width: 400px)",
  });

  const prevStock = () => {
    if (index !== 0) {
      setIndex(index - 1);
    }
  };

  const classes =
    " lg:pl-2 w-full flex-col bg-gray-100 grid grid-cols-12 lg:space-x-4 " +
    props.className;
  return (
    <div className={classes}>
      <span className="col-span-12 font-bold text-2xl pl-0 md:pl-4 pt-4 pb-6">
        Overview
      </span>
      {/* Part 1 */}
      <div className="sm:block hidden flex justify-center items-center bg-blue-200 h-8 md:h-16 lg:h-24 mt-1 rounded-full text-2xl lg:text-4xl col-span-1">
        1
      </div>
      <div className="col-span-12 sm:col-span-11">
        <div className="font-semibold">{!isMobileMode ? "1. Your Current Statistics" : "Your Current Statistics"}</div>
        <Card
          className="mx-auto text-center mt-2 "
          a={"A breakdown of your average sustainability scores"}
          b={props.score > 60 ? "GOOD" : props.score < 30 ? "POOR" : "NORMAL"}
          c={props.score}
          d={props.env}
          e={props.soc}
          f={props.gov}
        />
        <ul className="flex flex-col bg-gray-100 mt-4">
          {props.allItems.map((data, idx) => (
            <div key={idx}>
              {idx === index && (
                <StockAnalysisCard
                  companyName={data.Code}
                  stockName={data.Exch}
                  stockChange={data.Change}
                  last={data.Last}
                  name={data.Stock_Name}
                  stockChangePercent={data.ChangePerc}
                  esg={data.ESG}
                  e={data.E}
                  s={data.S}
                  g={data.G}
                />
              )}
            </div>
          ))}
          {/* Navigator for the items */}
          {props.allItems.length > 1 && (
            <div className="flex flex-row justify-between bg-white px-4 py-1">
              <button onClick={prevStock} className="font-semibold">
                Prev
              </button>
              <span>
                {index + 1}/{props.allItems.length}
              </span>
              <button onClick={nextStock} className="font-semibold">
                Next
              </button>
            </div>
          )}
        </ul>
      </div>

      {/* Part 2 */}
      <div className="sm:block hidden flex justify-center items-center bg-blue-200 h-8 md:h-16 lg:h-24 mt-10 rounded-full text-2xl lg:text-4xl col-span-1">
        2
      </div>
      <div className="col-span-12 sm:col-span-11">
        <div className="font-semibold mt-10">
          Understanding the benefits of ESG
        </div>
        <div className="bg-gray-100 mt-2">
          <div className="justify-between bg-white rounded-md flex flex-1 items-center p-4">
            <div className="basis-4/5">
              Investing in a stock with high ESG ratings have their individual
              benefits. Studies have proven that companies with higher ESG
              ratings have a positive relation with the financial performance.
              At the same time, these companies have a lower risk regarding
              their stock price and action. We will breakdown the individual
              factors here for your education.
            </div>
            <div className="basis-1/5">
              <img src="/flower.png" />
            </div>
          </div>
          <Accordion
            header={"Environment"}
            content={
              "On a whole, Climate change causes extensive disruption to economic activity and financial stability. Although financial services companies generate little direct carbon emissions and have limited effects to implicate the climate, it results in active and passive climate actions. Actively, as a shareholder of the company, institutions and individuals have a say in each decision made by the company, which can directly lead to climate actions. Passively, as the masses are increasing investments in organisations focused on climate actions, it, in turn, encourages them to continue such climate actions."
            }
          />
          <Accordion
            header={"Social"}
            content={
              "There was a 95% measure of certainty that CSR does affect a firms stock price. T-tests and CAAR analysis for both environmental and ethical indicate a positive relationship between CSR and stock price. Philanthropic CSR, however, was proven to be neutral by the t-test when relating CSR and stock price. The CAAR test determined a slightly negative relationship between them both."
            }
          />
          <Accordion
            header={"Governmental"}
            content={
              "Studies reveal that governance quality positively affects financial markets in developed countries. The stock markets that operate under efficient governance and institutional environments experience greater stock returns and lower level of risk. This might lead to an argument that such risk and returns relationships cannot sustain an equilibrium, as risk-averse investors will not invest in countries that are not mean variance efficient. Nevertheless, this argument disregards international market segmentation and the benefits of stock diversification that arise from countries with poor governance. This is similar to the situation that risk-averse investors carry certain stocks with higher risk and lower returns to attain diversification benefits."
            }
          />
        </div>
      </div>

      {/* Part 3 */}
      <div className="sm:block hidden flex justify-center items-center bg-blue-200 h-8 md:h-16 lg:h-24 mt-10 rounded-full text-2xl lg:text-4xl col-span-1">
        3
      </div>
      <div className="col-span-12 sm:col-span-11">
        <div className="font-semibold mt-10">
          Investing to Improve Your Score
        </div>
        <SectorCard
          sectors={props.sectors}
          className="mx-auto mt-3 "
          a={"A Breakdown of Your Portfolio’s Holdings"}
        />
        <ul className="flex flex-col bg-gray-100 mt-4">
          <StockAnalysisCard
            suggestion={true}
            companyName={"MSFT"}
            stockName={"NASDAQ"}
            stockChange={"View report"}
            esg={93}
            last={111.3}
            e={78}
            s={97}
            g={93}
          />
        </ul>
      </div>
      {/* Part 4 */}
      {/* <div className="font-semibold mt-5">Leaderboard</div>
      <div
        className={`p-5 flex-row w-full select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow bg-gray-100 w-full ${props.className}`}
      >
        <div className="basis-1/2 flex flex-col">
          <div>Sebastian</div>
          <div>Jason</div>
        </div>
        <div className="basis-1/2">Eiden wins</div>
      </div> */}
      <button
        className="w-20 h-10 bg-blue-500 text-white mt-5"
        onClick={props.setPage}
      >
        Back
      </button>
    </div>
  );
};
