from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.apps import apps
from crawler.models import ScrapingResult

URLS_PER_PAGE = 10

class SearchIndexerView(APIView):
    def get(self, request):
        indexer = apps.get_app_config('indexer').get_indexer()

        query = request.query_params.get('query', '')

        if query:
            results = indexer.search(query, URLS_PER_PAGE)
            transformed_results = []

            for result in results:
                filename, similarity = result
                page = ScrapingResult.objects.get(url=filename)
                content = ' '.join(page.content.split()[:20])
                transformed_results.append({
                    'url': filename,
                    'title': page.title,
                    'content': content,
                    'similarity': similarity,
                })

            return Response({'results': transformed_results}, status=status.HTTP_200_OK)
        else:
            return Response({'ERROR: No query provided.'}, status=status.HTTP_400_BAD_REQUEST)
