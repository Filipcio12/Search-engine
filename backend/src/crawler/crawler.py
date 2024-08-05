from models import ScrapingResult

import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse


class Crawler:
    def crawl(self, url, depth, parallel=True):
        try:
            response = requests.get(url)
        except:
            return

        content = BeautifulSoup(response.text, 'lxml')
        try:
            title = content.find('title').text
            page_content = ''
            for tag in content.findAll():
                if hasattr(tag, 'text'):
                    page_content += tag.text.strip().replace('\\n', ' ')
        except:
            return
        ScrapingResult.objects.get_or_create(url=url, defaults={'title': title, 'content': page_content})

        if depth == 0:
            return

        links = content.findAll('a')
        def crawl_link(link):
            try:
                href = link['href']
                if href.startswith('http'):
                    self.crawl(href, depth - 1)
                else:
                    parsed_url = urlparse(url)
                    protocol = parsed_url.scheme
                    domain = parsed_url.netloc
                    self.crawl(f'{protocol}://{domain}{href}', depth - 1)
            except KeyError:
                pass
        if parallel:
            with ThreadPoolExecutor(max_workers=10) as executor:
                executor.map(crawl_link, links)
        else:
            for link in links:
                crawl_link(link)