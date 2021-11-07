'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add("active");

  /* [DONE] remove class 'active' from all articles */

  const articles = document.querySelectorAll('.posts .post.active');

  for (let article of articles) {
    article.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add("active");
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
function generateTitleLinks() {
  console.log('Function generateTitleLinks was invoke');
  /* [DONE] clear link list */
  const titleList = document.querySelector('.list.titles');
  titleList.innerHTML = '';

  /* [DONE] Get article list */
  const articles = document.querySelectorAll('.post');
  for (let article of articles) {
    /*[DONE] Get article id */
    const articleId = article.getAttribute('id');
    /* [DONE] Get article title*/
    const articleTitle = article.querySelector('.post-title').innerHTML;
    /* [DONE]Create link */
    const link = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(link);

    /* [DONE] Add link to list*/
    titleList.insertAdjacentHTML('afterend', link);
  }
}

generateTitleLinks();