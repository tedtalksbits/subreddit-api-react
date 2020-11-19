import React, { useEffect, useState } from 'react';
import './Main.css';
import 'boxicons';


function Main() {

  
   const [articles, setArticles] = useState([]);
   const [subreddit, setSubreddit] = useState('webdev');



   useEffect(() => {
      fetch(`https://www.reddit.com/r/${subreddit}.json`)
         .then(response => {
            
            if(response.status!= 200){
               console.log("ERROR");
               return;
            }
            response.json()
               .then(result =>{
                  if(result != null){
                     setArticles(result.data.children);
                  }
               })
         })
   }, [subreddit]);


   // async code breaks when updating subreddit, why?

   // useEffect(() =>{
   //    fetchReddit();
   // }, [subreddit]);


   // const fetchReddit = async () =>{
   //    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);

   //    const result = await response.json();
   //    setArticles(result.data.children);
   //    // console.log(result.data.children);
   // }

   return (
      <div className="main">
         <div className="main__input">
            <input value={subreddit} type="text" onChange={e => setSubreddit(e.target.value)}/>
         </div>
         <div className="container">
            {articles.map(article =>(
               <div key={article.data.id} className="main__card">
                  <div className="card-top">
                     <a href={`https://reddit.com${article.data.permalink}`}>
                        <h3>{article.data.title}</h3>
                     </a>
                  </div>
                  <div className="card-bottom">
                     <div className="bottom-vote">
                        <box-icon type='solid' name='chevron-up'></box-icon>
                        <span>{article.data.ups}</span>
                     </div>
                     <div className="bottom-vote">
                        <box-icon type='solid' name='chevron-down'></box-icon>
                        <span>{article.data.downs}</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Main
