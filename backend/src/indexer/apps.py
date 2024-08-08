from django.apps import AppConfig
import os
import pickle
from indexer.indexer import Indexer
from django.conf import settings

class IndexerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'indexer'

    def ready(self):
        indexer_path = os.path.join(settings.BASE_DIR, 'index_data', 'indexer.pkl')
        try:
            with open(indexer_path, 'rb') as f:
                self.indexer = pickle.load(f)
        except Exception as e:
            self.indexer = Indexer()
            raise RuntimeError(f'ERROR: {str(e)}')
    
    def get_indexer(self):
        return getattr(self, 'indexer', None)
