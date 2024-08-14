# Search-engine
I implemented basic functionalities of web search engines using popular frameworks, ie. Django and React. Search engines maintain three following processes in near real time:

1) Web crawling
2) Indexing
3) Searching

In this project, all of these features are implemented, however they are not maintained in real time.

## Web crawling

The web crawling functionality was heavily inspired by the following repository on Github so please check it out:

https://github.com/Eng-Elias/search_engine_spider

The crawler app contains:

1) Crawler class: contains the webscraping logic.
2) ScrapingResult model: represents pages accessed by the Crawler class.
3) Crawl command: allows the developer to scrape web pages from a root URL to a certain depth.

Crawl command is used in the following way:
```
python manage.py crawl <url> <depth> [--parallel]
```
* url: replace with URL you wish to start crawling from
* depth: specifies the number of levels of URLs to follow
* --parallel (optional): include this flag if you want to enable parallel crawling. It only works with databases which support concurrent connections like PostgreSQL and does not work with SQLite.

## Indexing

The indexer app contains:

1) Indexer class: contains the indexing logic.
2) Index command: allows the developer to index all the pages currently in the database.
3) SearchIndexerView: /search endpoint which implements the searching functionality for the client.

The Indexer class uses a tf-idf matrix to index all the pages in the database. It also implements the search functionality using cosine similarities. To achieve this, both numpy and sci-kit learn libraries are used.

Index command is used in the following way:
```
python manage.py index
```
When index command is used, the indexer indexes all the pages in the database and then it is saved in the backend/src/index_data directory as index_data.plk file using the pickle library. The saved Indexer class is loaded by the IndexerConfig when the server starts running. That saved Indexer class is then later used by the SearchIndexerView to allow clients to search through the database on the /search endpoint.

## Use case
For this example use case I used the following commands:
```
python manage.py crawl https://www.britannica.com/summary/Michael-Jackson 1
python manage.py crawl https://www.britannica.com/summary/Bobby-Fischer 1
python manage.py crawl https://www.britannica.com/summary/Nobel-Prize 1
python manage.py crawl https://www.britannica.com/summary/William-Shakespeare 1
python manage.py crawl https://www.britannica.com/summary/Frederic-Chopin 1
python manage.py index
python manage.py runserver
```

I chose Britannica's summary articles for their brevity and the limited number of links which were also relevant. I used depth one to quickly gather some pages for this example. 