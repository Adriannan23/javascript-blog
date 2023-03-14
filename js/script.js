'use strict';

// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });
const titleClickHandler = function(event){
    const clickedElement = this;

    console.log('clickedElement (with plus): ' + clickedElement);
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */
    const activeArticles = document.querySelectorAll('.active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }
    /* [IN PROGRESS] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    /*  [DONE] remove class 'active' from all articles */

    /* get 'href' attribute from the clicked link */

    /* find the correct article using the selector (value of 'href' attribute) */

    /* add class 'active' to the correct article */
  }

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }