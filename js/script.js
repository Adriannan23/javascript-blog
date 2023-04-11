'use strict';
{
  const opts = {}
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassAuthorCount = 4,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list',
    optCloudClassAuthorPrefix = 'author-size-';


  // document.getElementById('test-button').addEventListener('click', function(){
  //     const links = document.querySelectorAll('.titles a');
  //     console.log('links:', links);
  //   });

  const titleClickHandler = function (event) {

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    // /* [DONE] add class 'active' to the clicked link */
    event.preventDefault();
    const clickedElement = this;

    clickedElement.classList.add('active');

    /*  [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    // /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    // /* find the correct article using the selector (value of 'href' attribute*/
    const targetArticle = document.querySelector(articleSelector);
    // console.log (targetArticle);

    // /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };




  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';


    for (let article of articles) {

      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */ /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';


      /* insert link into titleList */
      // titleList.innerHTML = titleList.innerHTML + linkHTML;
      // titleList.insertAdjacentHTML("beforeend",linkHTML);
      html = html + linkHTML;
      // console.log (html);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();


  function calculateTagsParams(tags) {

    const params = {
      max: 0,
      min: 999999
    };

    for (let tag in tags) {
      // console.log(tag + ' is used ' + tags[tag] + ' times');
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }

      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  }

  function calculateAuthorsParams(authors) {

    const params = {
      max: 0,
      min: 999999
    };

    for (let author in authors) {

      console.log(author + ' is used ' + authors[author] + ' times');
      if (authors[author] > params.max) {
        params.max = authors[author];
        console.log(authors[author])
      }
      if (authors[author] < params.min) {
        params.min = authors[author];
      }
    }
    return params;
  }

  function calculateTagClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    // console.log("classNum:" + classNumber);
    // console.log('tagsParams', params);
    // console.log(count);

    // console.log('zwroce takie cus: ' + (params + count));
    return optCloudClassPrefix + classNumber;

  }

  function calculateAuthorClass(count, params) {

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassAuthorCount - 1) + 1);

    // console.log("classNum:" + classNumber);
    // console.log('tagsParams', params);
    // console.log(count);

    // console.log('zwroce takie cus: ' + (params + count));
    return optCloudClassAuthorPrefix + classNumber;
    console.log(classNumber)
  }


  function generateTags() {

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      // Miejsce gdzie bdziemy zapisywac wygenerowane tagi? tylko w jednym mijscu bedziemy zapisywac wygenerowane tagi, dlatego jest pojedynczy querySelector.
      const tagsList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* add generated code to html variable */
        html = html + linkHTML + ' ';


        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsList.innerHTML = html;
      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);



    const tagsParams = calculateTagsParams(allTags);
    // console.log('tagsParams:', tagsParams)

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allTagsHTML += '<li><a href="#tag-' + tag + '"' + 'class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + ' ' + '</a>' + '</li>';

      const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);
      // console.log('tagLinkHTML:', tagLinkHTML);

    }
    /* [NEW] END LOOP: for each tag in allTags: */
    tagList.innerHTML = allTagsHTML;

  }

  generateTags();

  function tagClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {

      /* remove class active */
      activeTagLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allTagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLinkHref of allTagLinksHref) {

      /* add class active */
      tagLinkHref.classList.add('active');

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {

    /* find all links to tags */
    const links = document.querySelectorAll('.list.list-horizontal a, .list.tags a');

    /* START LOOP: for each link */
    for (let link of links) {

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }
  addClickListenersToTags();

  function generateAuthors() {

    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    //   /* START LOOP: for every article: */
    for (let article of articles) {

      /* find authors wrapper */
      const authorsList = article.querySelector(optArticleAuthorSelector);

      /* make html variable with empty string */
      let html = '';

      /* get authors from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      /* generate HTML of the link */
      const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';

      // const authorHTMLElement = 'author-' + articleAuthor;



      /* add generated code to html variable */
      html = html + linkHTML;
      console.log(linkHTML)

      /* [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* insert HTML of all the links into the author wrapper */
      authorsList.innerHTML = html;

      /* END LOOP: for every article: */

    }
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(optAuthorsListSelector);
    const authorsParams = calculateAuthorsParams(allAuthors);


    let allAuthorsHTML = '';
    for (let author in allAuthors) {
      allAuthorsHTML += '<li><a href="#author-' + author + '"' + 'class="' + calculateAuthorClass(allAuthors[author], authorsParams) + '">' + author + ' ' + '</a>' + '</li>';
      const authorLinkHTML = calculateAuthorClass(allAuthors[author], authorsParams);

    }
    authorList.innerHTML = allAuthorsHTML;
  }
  generateAuthors()

  function addClickListenersToAuthors() {

    /* find all links to authors */
    const links = document.querySelectorAll('.post-author a, .list.authors a');

    /* START LOOP: for each link */
    for (let link of links) {

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

    }
  }
  addClickListenersToAuthors();

  function authorClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');

    /* find all tag links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for (let activeAuthorLink of activeAuthorLinks) {

      /* remove class active */
      activeAuthorLink.classList.remove('active');
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const allAuthorsLinksHref = document.querySelectorAll('a[href="' + href + '"]');
    /* START LOOP: for each found author link */
    for (let authorLinkHref of allAuthorsLinksHref) {

      /* add class active */
      authorLinkHref.classList.add('active');
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }
}