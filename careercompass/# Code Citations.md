# Code Citations

## License: unknown
https://github.com/mbisovskyi/Groups_FullStack/tree/8d98c4ba55340b76851cc257fb11a69d2317ba51/backend/groups/views.py

```
(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['
```


## License: unknown
https://github.com/gabrielstonedelza/Abis-Kitchen/tree/08c10124049d56a601d7f2bf76b1f28505d0e027/api/views.py

```
is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes
```


## License: unknown
https://github.com/TheGavinCorkery/CapstoneDjangoBackend/tree/a4698aa35103cda7a819e705068451e7248c7900/drf_jwt_capstone_backend/goals/views.py

```
= 'POST':
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status
```

