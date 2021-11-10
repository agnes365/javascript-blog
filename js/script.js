'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(optTitleListSelector + ' a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement:', clickedElement);
  console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

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
  targetArticle.classList.add('active');
}

function generateTitleLinks() {
  console.log('Function generateTitleLinks was invoke');
  /* [DONE] clear link list */
  const titleList = document.querySelector('.list' + optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';
  /* [DONE] Get article list */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    /*[DONE] Get article id */
    const articleId = article.getAttribute('id');
    /* [DONE] Get article title*/
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* [DONE]Create link */
    const link = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(link);

    /* [DONE] Add link to list*/
    html = html + link;
  }
  titleList.insertAdjacentHTML('beforeend', html);
}

generateTitleLinks();

const links = document.querySelectorAll(optTitleListSelector + ' a');

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
function generateTags() {
  /*[DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /*[DONE] START LOOP: for every article: */
  for (let article of articles) {

    /*[DONE] find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
   
    /* make html variable with empty string */

    /* get tags from data-tags attribute */

    /* split tags into array */

    /* START LOOP: for each tag */

    /* generate HTML of the link */

    /* add generated code to html variable */

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    /* END LOOP: for every article: */
  }
}

generateTags();