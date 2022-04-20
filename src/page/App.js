import React from 'react';
import "../../src/index.css";
async function searchNews(q) {
    q = encodeURIComponent(q);
    const response = await fetch(`
  https://newsapi.org/v2/everything?q=${q}&from=2022-03-20&sortBy=publishedAt&apiKey=d174720f7f28494eb86e576061f0cc64`, {
        "method": "GET",
    }).then(response => response.json());
    return response;
}

function App() {
    const [query, setQuery] = React.useState("");
    const [list, setList] = React.useState([]);

    const search = (e) => {
        e.preventDefault();
        searchNews(query).then(response => {
            console.log(response);
            setList(response.articles);
        });
    };

    console.log(list);
    return (
        <div className="container px-10 mx-auto">
            <div>
                <form onSubmit={search} className="text-right m-8">
                    <input
                        autoFocus
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search for news"
                        className="w-96 h-8 bg-gray-400 border-2 border-gray-500 rounded-lg p-2"
                    />
                    <button className="w-32 h-8 border-2 border-black rounded-lg ml-2"><b>Search</b></button>
                </form>

                {list?.length === 0
                    ? (<p><i>No results</i></p>)
                    : (<ul>
                        {list?.map(article => (
                            <Item key={article.publishedAt} article={article} />
                        ))}
                    </ul>)
                }
            </div>
        </div>
    );
}

function Item({ article }) {

    return (
        <li className="list-none">
            <div className="grid grid-cols-2 m-4">
            <div className="image">
            {article.urlToImage &&
                    <img className="w-auto h-72"
                        alt=""
                        src={article.urlToImage}
                    />
                }
            </div>
            <div>
              <div className="block ml-4">
                <a href={article.url}>
                  <h2 className="font-bold text-2xl">{ article.title }</h2>
                </a>
                <h3><b>Author:</b> { article.author }</h3>
                <p><b>Description:</b> { article.description }</p>
                <p><b>Source:</b> { article.source.name }</p>
                <p><b>Published at: </b> { article.publishedAt }</p>
              </div>
            </div>
          </div>
            {/* <div className="grid grid-cols-2 m-4">
                {article.urlToImage &&
                    <img className="w-72 h-72"
                        alt=""
                        src={article.urlToImage}
                    />
                }
                <h2 className="title">
                    <a href={article.url}>{article.title}</a>
                </h2>
                <p className="description">
                    {article.description}
                </p>
                <div className="meta">
                    <span className="author"><b>Author:</b>{article.author}</span>
                    <span className="source"><b>Source:</b>{article.source.name}</span>
                </div>
            </div> */}
        </li>
    );
}

export default App;