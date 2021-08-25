#!/bin/bash

# 获取 所有 文件
curl -X 'GET' \
  'https://api.nft.storage/?limit=10' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYwMjk2QzA5NTdiY2QzMUVGNWJDZkY1ODIxNkUwYzYzNjJFN2RiNTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyOTM0NTIzODgwNSwibmFtZSI6InppbmV0ZSJ9.nHM50vl4vdc9x1_tVU1zJpKfUueloLD9sSciojU4dXs'