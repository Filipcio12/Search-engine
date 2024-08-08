from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.apps import apps

URLS_PER_PAGE = 10

class SearchIndexerView(APIView):
    def get(self, request):
        indexer = apps.get_app_config('indexer').get_indexer()

        query = request.query_params.get('query', '')

        if query:
            results = indexer.search(query, URLS_PER_PAGE)
            return Response({'results': results}, status=status.HTTP_200_OK)
        else:
            return Response({'ERROR: No query provided.'}, status=status.HTTP_400_BAD_REQUEST)
