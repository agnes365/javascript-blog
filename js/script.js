'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

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
function generateTitleLinks(customSelector = '') {
  console.log('Function generateTitleLinks was invoke');
  /* [DONE] clear link list */
  const titleList = document.querySelector('.list' + optTitleListSelector);
  titleList.innerHTML = '';

  let html = '';
  /* [DONE] Get article list */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
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

  const links = document.querySelectorAll(optTitleListSelector + ' a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = {};
  params.min = Math.min(...Object.values(tags));
  params.max = Math.max(...Object.values(tags));
  return params;
}
function calculateTagClass(count, params) {
  const value = (count - params.min) * 100 / (params.max - params.min);
  const factor = 100 / optCloudClassCount;
  let classNo = Math.floor(value / factor) + 1;
  if (classNo > optCloudClassCount)
    classNo = optCloudClassCount;
  return optCloudClassPrefix + classNo;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object*/
  let allTags = {};

  /*[DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /*[DONE] START LOOP: for every article: */
  for (let article of articles) {

    /*[DONE] find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */
    let html = '';

    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* [DONE]START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /*[DONE] generate HTML of the link */
      const linkHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /*[DONE] add generated code to html variable */
      html = html + linkHtml;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }

    /*[DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.insertAdjacentHTML('beforeend', html);

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links Html code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:' + tagsParams);

  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag incallTags */
  for (let tag in allTags) {
    /*[NEW] generate code of a link and add it to allTagshtml*/
    allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
  }
  /* [NEW] END LOOP: for each tag in allTags */

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */
  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /*[DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTagList = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTagList) {

    /* remove class active */
    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagList = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let tag of tagList) {

    /* add class active */
    tag.classList.add('active');

    /* END LOOP: for each found tag link */
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  for (let link of links) {

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* find all articles*/
  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    const author = article.getAttribute('data-author');
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    const link = '<a href="#author-' + author + '">' + author + '</a>';
    authorWrapper.insertAdjacentHTML('beforeend', link);
  }
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');

  const activeAuthorList = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of activeAuthorList) {
    activeAuthor.classList.remove('active');
  }

  const authorList = document.querySelectorAll('a[href="' + href + '"]');

  for (let activeAuthor of authorList) {
    activeAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const links = document.querySelectorAll('a[href^="#author-"]');

  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();