import Link from "next/link";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { StockLayout } from "../components/StockLayout";
import { StockEvaluator } from "../components/StockEvaluator";
import { StockScore } from "../components/StockScore";
import { useState } from "react";
import { Container } from "../components/Container";
import { Select } from "../components/Select";
import ESGscores from "../jsonfiles/ESGscores.json";

export default function IndexPage({ datapoint }) {
  const [page, willSetPage] = useState(0);
  const [name, setName] = useState("");
  const [items, setItems] = useState([1]);
  const [stocks, setStocks] = useState([]);
  const [score, setScore] = useState(0);

  const [allItems, setAllItems] = useState([]);

  var gatherStats = () => {
    // Hold average ESG score
    let count = 0;
    let total = 0;
    let average = 0;
    // Prevents stocks from piling up when code changes in local
    if (allItems.length !== stocks.length) {
      // "allItems" will be the state that holds all the stocks and info
      for (let i = 0; i < stocks.length; i++) {
        for (let j = 0; j < datapoint.stocks.length; j++) {
          if (stocks[i] === datapoint.stocks[j].Code) {
            allItems.push(datapoint.stocks[j]);
            setAllItems([...allItems]);
            console.log(allItems);

            total = total + datapoint.stocks[j].ESG;
            console.log("total is " + total);
            count++;
            if (count === stocks.length) {
              average = total / count;
              setScore(average);
              console.log("Average score is " + score);
            }
          }
        }
      }
    } else {
      console.log("Close");
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    for (let i = 2; i < event.target.elements.length - 1; i += 2) {
      const value = event.target[i].value;
      if (value !== "Choose a stock") {
        stocks.push(value);
      }
    }
    if (stocks.length != 0 && stocks[0].length < 13) {
      setName(event.target.elements[0].value);
      setStocks([...stocks]);
      willSetPage(1);
    } else {
      setStocks([]);
    }
    gatherStats();
  };

  const addSelect = () => {
    if (items.length < 6) {
      items.push(items[items.length - 1] + 1);
      setItems([...items]);
    }
  };

  const willRemoveItem = () => {
    if (items.length > 1) {
      items.pop();
      setItems([...items]);
    }
  };

  const resetPage = () => {
    setItems([1]);
    setStocks([]);
    willSetPage(0);
    setAllItems([]);
    setScore(0);
  };

  return (
    <main>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex">
        <Sidebar />
        {page === 0 && (
          <Container>
            <form onSubmit={onSubmitHandler} className="flex flex-col">
              <p className="mb-2 flex flex-col content-center">
                {" "}
                <label htmlFor="name">(1) Name</label>
                <input id="name" className="border border-gray-300" />
              </p>
              <div className="mb-2 flex flex-col content-center">
                <div className="flex flex-row">
                  <label htmlFor="countries">(2) Stock</label>{" "}
                  <input
                    type="button"
                    className="w-10 border border-gray-300"
                    value="-"
                    onClick={willRemoveItem}
                  />
                </div>

                {items.map((data, idx) => (
                  <Select
                    data={datapoint}
                    key={idx}
                    number={data}
                    willAddItem={() => addSelect()}
                  />
                ))}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
                type="submit"
              >
                Submit
              </button>
            </form>
          </Container>
        )}
        {page === 1 && (
          <div className="grid grid-cols-4 md:grid-cols-12 w-full grid-rows-2 md:grid-rows-1">
            <StockLayout
              className="h-full col-span-4 md:col-span-8 row-span-1"
              setPage={resetPage}
              name={name}
              allItems={allItems}
              score={score}
            />
            <StockScore
              setPage={() => willSetPage(2)}
              className="col-span-4 md:col-span-4 h-full p-10 row-span-1"
              score={score}
            />
          </div>
        )}
        {page === 2 && (
          <StockEvaluator setPage={() => willSetPage(1)} score={score} allItems={allItems}/>
        )}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const stocks = await ESGscores;

  return {
    props: {
      datapoint: {
        stocks: stocks,
      },
    },
  };
}
