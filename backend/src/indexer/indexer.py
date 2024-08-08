import string
import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class Indexer():
    def __init__(self, lang='english') -> None:
        self.vectorizer = TfidfVectorizer(stop_words=lang)
        self.tfidf_matrix = []
        self.filenames = []

    def __preprocess(self, text: str) -> str:
        text = text.lower()
        text = text.translate(str.maketrans('', '', string.punctuation))
        return text

    def index_documents(self, documents: list[str], filenames: list[str]):
        processed_documents = [self.__preprocess(doc) for doc in documents]
        self.tfidf_matrix = self.vectorizer.fit_transform(processed_documents)
        self.filenames = filenames

    def search(self, query, top_n=5):
        query_vec = self.vectorizer.transform([query])
        cosine_similarities = cosine_similarity(query_vec, self.tfidf_matrix).flatten()
        most_similar_docs = np.argsort(cosine_similarities)[::-1][:top_n]
        results = [(self.filenames[i], cosine_similarities[i]) for i in most_similar_docs]
        return results
    
    def save(self, filepath: str):
        try:
            with open(filepath, 'wb') as f:
                pickle.dump(self, f)
        except Exception as e:
            raise RuntimeError(f'ERROR: {str(e)}')

    def load(self, filepath: str):
        try:
            with open(filepath, 'rb') as f:
                return pickle.load(f)
        except Exception as e:
            raise RuntimeError(f'ERROR: {str(e)}')
