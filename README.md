# Search-engine
I implemented basic functionalities of web search engines using popular frameworks, ie. Django and React. Search engines maintain three following processes in near real time:

1) Web crawling
2) Indexing
3) Searching

In this project, all of these features are implemented, however they are not maintained in real time.

Django backend
---------------------------------------------------------------------------------------------------------------------------------------------------------------------

The Django backend consists of two main apps: crawler and indexer. Crawler app contains:

1) Crawler class which contains the webscraping logic.
2) ScrapingResult model which represents pages accessed by the Crawler class.
3) Crawl command which allows the developer to scrape web pages from a root url to a certain depth.

Crawl command is used in the following way:
> 
