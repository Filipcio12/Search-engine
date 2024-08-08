import os
from django.conf import settings
from django.core.management.base import BaseCommand
from indexer.indexer import Indexer
from crawler.models import ScrapingResult


class Command(BaseCommand):
    help = 'Index a series of pages using tf-idf.'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        try:
            webpages = ScrapingResult.objects.all()

            documents = []
            filenames = []

            for webpage in webpages:
                filenames.append(webpage.url)
                documents.append(webpage.content)

            indexer = Indexer()
            indexer.index_documents(documents, filenames)
            
            INDEXER_DIR = os.path.join(settings.BASE_DIR, 'index_data')
            os.makedirs(INDEXER_DIR, exists_ok=True)
            indexer.save(os.path.join(INDEXER_DIR, 'indexer.pkl'))

            self.stdout.write(self.style.SUCCESS('Successfully indexed pages.'))

        except Exception as e:
            self.stderr.write(self.style.ERROR(f'ERROR: {str(e)}'))